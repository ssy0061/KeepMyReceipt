package com.ieung.receipt.repository;

import com.ieung.receipt.entity.TransactionDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Repository
public interface TransactionDetailRepoCommon {
    Page<TransactionDetail> findByContentOrTag(Long clubId, String query, LocalDate start, LocalDate end, Pageable pageable);
    List<TransactionDetail> findByPayDate(Long clubId, YearMonth yearMonth);
    Integer findIncomeByClubIdAndDate(Long clubId, LocalDate start, LocalDate end);
    Integer findExpenditureByClubIdAndDate(Long clubId, LocalDate start, LocalDate end);
}
