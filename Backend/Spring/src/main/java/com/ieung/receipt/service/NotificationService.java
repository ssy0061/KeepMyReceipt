package com.ieung.receipt.service;

import com.ieung.receipt.code.NotiCode;
import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.config.security.JwtTokenProvider;
import com.ieung.receipt.dto.notification.NotificationData;
import com.ieung.receipt.dto.notification.NotificationRequestDTO;
import com.ieung.receipt.entity.Club;
import com.ieung.receipt.entity.CrewToken;
import com.ieung.receipt.entity.Notification;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.exception.CAuthenticationEntryPointException;
import com.ieung.receipt.exception.CUserNotFoundException;
import com.ieung.receipt.repository.CrewTokenRepository;
import com.ieung.receipt.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PushService pushService;

    @Transactional(readOnly = false)
    public void createOneNotification(NotiCode notiCode, String title, String body, Club club, List<CrewToken> crewTokens) {
        if (crewTokens == null || crewTokens.size() == 0) {
            return;
        }

        Notification notification = Notification.builder()
                .title(title)
                .body(body)
                .crew(crewTokens.get(0).getCrew())
                .club(club)
                .notiCode(notiCode)
                .isRead(YNCode.N)
                .build();

        notificationRepository.save(notification);

        for (CrewToken crewToken : crewTokens) {
            if (crewToken.getFcmToken() != null && crewToken.getIsAllowedPush() == YNCode.Y
                    && jwtTokenProvider.validateToken(crewToken.getRefreshToken())) {
                pushService.sendPushToDevice(NotificationRequestDTO.builder()
                        .registration_ids(crewToken.getFcmToken())
                        .notification(NotificationData.builder()
                                .title(title)
                                .body(body)
                                .build())
                        .build());
            }
        }
    }

    public Page<Notification> getNotifications(Long crewId, Pageable pageable) {
        return notificationRepository.findByCrewId(crewId, pageable);
    }

    @Transactional(readOnly = false)
    public void readNotification(Long crewId, long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ApiMessageException("해당하는 알림이 없습니다."));

        if (notification.getCrew().getId() == crewId) {
            notification.updateIsRead(YNCode.Y);
            notificationRepository.save(notification);
        } else {
            throw new AccessDeniedException("");
        }
    }

    @Transactional(readOnly = false)
    public void deleteNotification(Long crewId, long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ApiMessageException("해당하는 알림이 없습니다."));

        if (notification.getCrew().getId() == crewId) {
            notificationRepository.delete(notification);
        } else {
            throw new AccessDeniedException("");
        }
    }
}
