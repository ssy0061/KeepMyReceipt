package com.ieung.receipt.service;

import com.ieung.receipt.code.AuthCode;
import com.ieung.receipt.dto.req.TransactionReqDTO;
import com.ieung.receipt.entity.ClubCrew;
import com.ieung.receipt.entity.Transaction;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.repository.ClubCrewRepository;
import com.ieung.receipt.repository.TransactionDetailRepository;
import com.ieung.receipt.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {
    private final ClubCrewRepository clubCrewRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionDetailRepository transactionDetailRepository;

    /**
     * 거래 내역 등록
     * @param clubId, crewId, transactionReqDTO
     */
    public void createTransaction(Long clubId, Long crewId, TransactionReqDTO transactionReqDTO) {
        ClubCrew clubCrew = clubCrewRepository.findByClubIdAndCrewIdWithCrew(clubId, crewId)
                .orElseThrow(() -> new ApiMessageException("모임에 가입된 회원이 아닙니다."));

        if (clubCrew.getAuth() == AuthCode.NONE || clubCrew.getAuth() == AuthCode.NORMAL) {
            throw new AccessDeniedException("");
        }

    }

    /**
     * 모임별 권한 확인
     * @param clubId, crewId
     */
    public AuthCode getAuth(long clubId, long crewId) {
        AuthCode authCode = clubCrewRepository.findAuthCodeByClubIdAndCrewId(clubId, crewId);

        if (authCode == null) {
            throw new ApiMessageException("모임에 가입된 회원이 아닙니다.");
        }

        return authCode;
    }
}
