package com.ieung.receipt.service;

import com.ieung.receipt.code.AuthCode;
import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.dto.req.TransactionDetailReqDTO;
import com.ieung.receipt.dto.req.TransactionReqDTO;
import com.ieung.receipt.entity.ClubCrew;
import com.ieung.receipt.entity.Request;
import com.ieung.receipt.entity.Transaction;
import com.ieung.receipt.entity.TransactionDetail;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.repository.ClubCrewRepository;
import com.ieung.receipt.repository.RequestRepository;
import com.ieung.receipt.repository.TransactionDetailRepository;
import com.ieung.receipt.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {
    private final ClubCrewRepository clubCrewRepository;
    private final RequestRepository requestRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionDetailRepository transactionDetailRepository;

    /**
     * 거래 내역 등록
     * @param clubId, crewId, transactionReqDTO
     * @return transaction
     */
    public Transaction createTransaction(Long clubId, Long crewId, TransactionReqDTO transactionReqDTO) {
        ClubCrew clubCrew = clubCrewRepository.findByClubIdAndCrewIdWithCrew(clubId, crewId)
                .orElseThrow(() -> new ApiMessageException("모임에 가입된 회원이 아닙니다."));

        if (clubCrew.getAuth() == AuthCode.NONE || clubCrew.getAuth() == AuthCode.NORMAL) {
            throw new AccessDeniedException("");
        }

        Transaction transaction;

        // 연관 영수증 청구 내역이 없는 경우
        if (transactionReqDTO.getRequestId() == null) {
            transaction = Transaction.builder()
                    .payDate(transactionReqDTO.getDate())
                    .price(transactionReqDTO.getTotalPrice())
                    .approveCrewId(crewId)
                    .requestCrewId(crewId)
                    .request(null)
                    .club(clubCrew.getClub())
                    .build();
        // 연관 영수증 청구 내역이 있는 경우
        } else {
            Request request = requestRepository.findById(transactionReqDTO.getRequestId())
                    .orElseThrow(() -> new ApiMessageException("해당하는 청구 내역이 없습니다."));

            transaction = Transaction.builder()
                    .payDate(request.getPayDate())
                    .price(request.getPrice())
                    .approveCrewId(crewId)
                    .requestCrewId(request.getCrewId())
                    .request(request)
                    .club(clubCrew.getClub())
                    .build();
        }

        Transaction resTransaction = transactionRepository.save(transaction);

        // 대분류 활성화 모임의 경우
        if (clubCrew.getClub().getIsActiveCategory() == YNCode.Y) {
            List<TransactionDetail> transactionDetailList = new ArrayList<>();

            // 각 세부 항목별로 저장
            for (TransactionDetailReqDTO transactionDetailReqDTO : transactionReqDTO.getItems()) {
                TransactionDetail transactionDetail = TransactionDetail.builder()
                        .transaction(transaction)
                        .name(transactionDetailReqDTO.getName())
                        .count(transactionDetailReqDTO.getCount())
                        .price(transactionDetailReqDTO.getPrice())
//                        .largeCategoryId(transactionDetailReqDTO.getCategoryId())
//                        .smallCategoryId(transactionDetailReqDTO.getCategoryId())
//                        .largeTagId(transactionDetailReqDTO.getTagId())
//                        .smallTagId(transactionDetailReqDTO.getTagId())

                        .build();
            }

        // 대분류 비활성화 모임의 경우
        } else {

        }

        return resTransaction;
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
