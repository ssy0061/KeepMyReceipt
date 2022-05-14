package com.ieung.receipt.service;

import com.ieung.receipt.code.AuthCode;
import com.ieung.receipt.code.StateCode;
import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.dto.req.TransactionDetailReqDTO;
import com.ieung.receipt.dto.req.TransactionReqDTO;
import com.ieung.receipt.entity.*;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.repository.*;
import jdk.jfr.Category;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {
    private final ClubCrewRepository clubCrewRepository;
    private final RequestRepository requestRepository;
    private final TransactionRepository transactionRepository;
    private final TransactionDetailRepository transactionDetailRepository;
    private final AssetSCategoryRepository assetSCategoryRepository;
    private final BudgetSCategoryRepository budgetSCategoryRepository;
    private final AssetRepository assetRepository;
    private final BudgetRepository budgetRepository;
    private final TagRepository tagRepository;

    /**
     * 거래 내역 등록
     * @param clubId, crewId, transactionReqDTO
     * @return transaction
     */
    @Transactional(readOnly = false)
    public Transaction createTransaction(Long clubId, Long crewId, TransactionReqDTO transactionReqDTO) {
        ClubCrew clubCrew = clubCrewRepository.findByClubIdAndCrewIdWithCrew(clubId, crewId)
                .orElseThrow(() -> new ApiMessageException("모임에 가입된 회원이 아닙니다."));

        if (clubCrew.getAuth() == AuthCode.NONE || clubCrew.getAuth() == AuthCode.NORMAL) {
            throw new AccessDeniedException("");
        }

        Transaction transaction;

        // 연관 영수증 청구 내역이 없는 경우
        if (transactionReqDTO.getRequestId() == null) {
            transaction = createTransactionWithoutRequest(clubCrew, transactionReqDTO);
        // 연관 영수증 청구 내역이 있는 경우
        } else {
            transaction = createTransactionWithRequest(clubCrew, transactionReqDTO);
        }

        Transaction resTransaction = transactionRepository.save(transaction);

        Map<String, Map<String, Integer>> assetMap = new HashMap<>(); // 자산별 변동 저장하는 map
        Map<String, Map<String, Integer>> budgetMap = new HashMap<>(); // 예산, 지출, 수입별 변동 저장하는 map

        List<TransactionDetail> transactionDetailList = new ArrayList<>();

        int totalPrice = 0; // 총금액

        // 각 세부 항목별로 저장
        for (TransactionDetailReqDTO detailReqDTO : transactionReqDTO.getList()) {
            TransactionDetail transactionDetail = TransactionDetail.builder()
                    .transaction(transaction)
                    .payDate(transaction.getPayDate())
                    .type(detailReqDTO.getType())
                    .name(detailReqDTO.getName())
                    .price(detailReqDTO.getType().equals("자산") || detailReqDTO.getType().equals("지출") ?
                            0 - detailReqDTO.getPrice() : detailReqDTO.getPrice())
                    .memo(detailReqDTO.getMemo())
                    .build();

            Tag tag = null;

            if (detailReqDTO.getTagId() != null) {
                tag = tagRepository.findTagByIdAndClub(detailReqDTO.getTagId(), clubCrew.getClub())
                        .orElseThrow(() -> new ApiMessageException("존재하는 태그가 아닙니다."));
            }
            transactionDetail.updateTags(tag);

            if (detailReqDTO.getType().equals("자산")) {
                AssetSCategory assetSCategory = assetSCategoryRepository.findAssetSCategoryByAscIdAndClub(detailReqDTO.getCategoryId(), clubCrew.getClub())
                        .orElseThrow(() -> new ApiMessageException("존재하는 소분류가 아닙니다."));

                transactionDetail.updateCategory(assetSCategory.getLcName(), assetSCategory.getAscName());

                Map<String, Integer> map = getMap(assetMap, assetSCategory.getLcName());
                map.put(assetSCategory.getAscName(), map.getOrDefault(assetSCategory.getAscName(), 0) + detailReqDTO.getPrice());

                // 소분류가 현금이 아닌 경우 현금 삭감
                if (!assetSCategory.getAscName().equals("현금")) {
                    map = getMap(assetMap, "현금 및 현금성자산");
                    map.put("현금", map.getOrDefault("현금", 0) + transactionDetail.getPrice());
                }
            } else {
                BudgetSCategory budgetSCategory = budgetSCategoryRepository.findBudgetSCategoryByBscIdAndClub(detailReqDTO.getCategoryId(), clubCrew.getClub())
                        .orElseThrow(() -> new ApiMessageException("존재하는 소분류가 아닙니다."));
                transactionDetail.updateCategory(budgetSCategory.getLcName(), budgetSCategory.getLcName());

                Map<String, Integer> map = getMap(budgetMap, budgetSCategory.getLcName());
                map.put(budgetSCategory.getBscName(), map.getOrDefault(budgetSCategory.getBscName(), 0) + detailReqDTO.getPrice());

                // 유형이 지출인 경우 현금 삭감
                if (transactionDetail.getType().equals("지출")) {
                    map = getMap(assetMap, "현금 및 현금성자산");
                    map.put("현금", map.getOrDefault("현금", 0) + transactionDetail.getPrice());
                }
            }

            totalPrice += detailReqDTO.getPrice();
            transactionDetailList.add(transactionDetail);
        }

        // 총액 일치 여부 확인
        if (totalPrice != transaction.getPrice()) {
            throw new ApiMessageException("항목 금액의 총계가 총금액과 일치하지 않습니다.");
        }

        // 이후 자산 현황표 수정, 자산 수정
        updateAsset(assetMap, transaction);

        // 이후 예산 운영표 수정
        updateBudget(budgetMap, transaction);

        transactionDetailRepository.saveAll(transactionDetailList);

        return resTransaction;
    }

    public Transaction createTransactionWithRequest(ClubCrew clubCrew, TransactionReqDTO transactionReqDTO) {
        Request request = requestRepository.findById(transactionReqDTO.getRequestId())
                .orElseThrow(() -> new ApiMessageException("해당하는 청구 내역이 없습니다."));

        if (request.getClub().getId() != clubCrew.getClub().getId()) {
            throw new ApiMessageException("해당하는 청구 내역이 없습니다.");
        } else if (request.getState() != StateCode.REQUEST) {
            throw new ApiMessageException("이미 처리된 영수증입니다.");
        }

        request.updateState(StateCode.APPROVE);
        requestRepository.save(request);

        return Transaction.builder()
                .payDate(request.getPayDate())
                .price(request.getPrice())
                .approveCrewId(clubCrew.getCrew().getId())
                .requestCrewId(request.getCrewId())
                .request(request)
                .club(clubCrew.getClub())
                .build();
    }

    public Transaction createTransactionWithoutRequest(ClubCrew clubCrew, TransactionReqDTO transactionReqDTO) {
        return Transaction.builder()
                .payDate(transactionReqDTO.getDate())
                .price(transactionReqDTO.getTotalPrice())
                .approveCrewId(clubCrew.getCrew().getId())
                .requestCrewId(clubCrew.getCrew().getId())
                .request(null)
                .club(clubCrew.getClub())
                .build();
    }

    /**
     * 리더, 관리자인지 확인
     * @param clubId, crewId
     */
    public void checkAuth(long clubId, long crewId) {
        AuthCode authCode = clubCrewRepository.findAuthCodeByClubIdAndCrewId(clubId, crewId);

        if (authCode == null || authCode == AuthCode.NONE) {
            throw new ApiMessageException("모임에 가입된 회원이 아닙니다.");
        } else if (authCode == AuthCode.NORMAL) {
            throw new AccessDeniedException("");
        }
    }

    /**
     * 거래내역 리스트 조회
     * @param clubId, crewId, query, start, end, pageable
     */
    public Page<TransactionDetail> getTransactions(Long clubId, Long crewId, String query, LocalDate start, LocalDate end, Pageable pageable) {
        checkAuth(clubId, crewId);

        return transactionDetailRepository.findByContentOrTag(clubId, query, start, end, pageable);
    }

    /**
     * 특정 거래내역 조회
     * @param crewId, transactionId
     */
    public Transaction getTransaction(Long crewId, Long transactionId) {
        Transaction transaction = transactionRepository.findTransactionByIdWithTransactionDetails(transactionId)
                .orElseThrow(() -> new ApiMessageException("해당하는 거래내역이 없습니다."));

        checkAuth(transaction.getClub().getId(), crewId);

        return transaction;
    }

    /**
     * 특정 거래내역 삭제
     * @param crewId, transactionId
     */
    @Transactional(readOnly = false)
    public Transaction deleteTransaction(Long crewId, Long transactionId) {
        Transaction transaction = transactionRepository.findTransactionByIdWithTransactionDetails(transactionId)
                .orElseThrow(() -> new ApiMessageException("해당하는 거래내역이 없습니다."));

        // 관련 청구 내역 승인 취소
        if (transaction.getRequest() != null ) {
            Request request = transaction.getRequest();
            request.updateState(StateCode.REQUEST);
            requestRepository.save(request);
        }

        checkAuth(transaction.getClub().getId(), crewId);

        Map<String, Map<String, Integer>> assetMap = new HashMap<>(); // 자산별 변동 저장하는 map
        Map<String, Map<String, Integer>> budgetMap = new HashMap<>(); // 예산, 지출, 수입별 변동 저장하는 map

        // 각 세부 항목별로 수정 내용 확인
        for (TransactionDetail transactionDetail : transaction.getTransactionDetails()) {
            if (transactionDetail.getType().equals("자산")) {
                AssetSCategory assetSCategory = assetSCategoryRepository
                        .findAssetSCategoryByClubAndLcNameAndAscName(transaction.getClub(), transactionDetail.getLargeCategory(), transactionDetail.getSmallCategory())
                        .orElseThrow(() -> new ApiMessageException("존재하는 소분류가 아닙니다."));

                Map<String, Integer> map = getMap(assetMap, assetSCategory.getLcName());
                map.put(assetSCategory.getAscName(), map.getOrDefault(assetSCategory.getAscName(), 0) + transactionDetail.getPrice());

                // 소분류가 현금이 아닌 경우 현금 추가
                if (!assetSCategory.getAscName().equals("현금")) {
                    map = getMap(assetMap, "현금 및 현금성자산");
                    map.put("현금", map.getOrDefault("현금", 0) + (0 - transactionDetail.getPrice()));
                }
            } else {
                BudgetSCategory budgetSCategory = budgetSCategoryRepository
                        .findBudgetSCategoryByClubAndLcNameAndBscName(transaction.getClub(), transactionDetail.getLargeCategory(), transactionDetail.getSmallCategory())
                        .orElseThrow(() -> new ApiMessageException("존재하는 소분류가 아닙니다."));

                Map<String, Integer> map = getMap(budgetMap, budgetSCategory.getLcName());
                map.put(budgetSCategory.getBscName(), map.getOrDefault(budgetSCategory.getBscName(), 0) + transactionDetail.getPrice());

                // 유형이 지출인 경우 현금 추가
                if (transactionDetail.getType().equals("지출")) {
                    map = getMap(assetMap, "현금 및 현금성자산");
                    map.put("현금", map.getOrDefault("현금", 0) + (0 - transactionDetail.getPrice()));
                }
            }
        }

        // 이후 자산 현황표 수정, 자산 수정
        updateAsset(assetMap, transaction);

        // 이후 예산 운영표 수정
        updateBudget(budgetMap, transaction);

        transactionDetailRepository.deleteAll(transaction.getTransactionDetails());
        transactionRepository.delete(transaction);

        return transaction;
    }

    // 대분류, 소분류로 해당 map 반환
    public Map<String, Integer> getMap(Map<String, Map<String, Integer>> map, String lcName) {
        Map<String, Integer> res;
        if (map.containsKey(lcName)) {
            res = map.get(lcName);
        } else {
            res = new HashMap<>();
            map.put(lcName, res);
        }

        return res;
    }
    @Transactional(readOnly = false)
    public void updateAsset(Map<String, Map<String, Integer>> assetMap, Transaction transaction) {
        for (String lcName : assetMap.keySet()) {
            Map<String, Integer> map = assetMap.get(lcName);

            for (String ascName : map.keySet()) {
                int changes = map.get(ascName);

                assetRepository.updateBalanceByClubIdAndLcNameAndAscNameAndDate(transaction.getClub().getId(), lcName, ascName,
                        YearMonth.of(transaction.getPayDate().getYear(),
                                transaction.getPayDate().getMonth()), changes);
                assetSCategoryRepository.updateBalanceByClubIdAndLcNameAndAscName(transaction.getClub().getId(), lcName, ascName, changes);
            }
        }
    }
    @Transactional(readOnly = false)
    public void updateBudget(Map<String, Map<String, Integer>> budgetMap, Transaction transaction) {
        for (String lcName : budgetMap.keySet()) {
            Map<String, Integer> map = budgetMap.get(lcName);

            for (String bscName : map.keySet()) {
                int changes = map.get(bscName);

                budgetRepository.updateChangesByClubIdAndLcNameAndBscNameAndDate(transaction.getClub().getId(), lcName, bscName,
                        YearMonth.of(transaction.getPayDate().getYear(),
                                transaction.getPayDate().getMonth()), changes);
            }
        }
    }
}
