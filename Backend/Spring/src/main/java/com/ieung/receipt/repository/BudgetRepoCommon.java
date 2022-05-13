package com.ieung.receipt.repository;

import org.springframework.stereotype.Repository;

import java.time.YearMonth;

@Repository
public interface BudgetRepoCommon {
    void updateChangesByClubIdAndSmallCategoryAndDate(Long clubId, String smallCategory, YearMonth date, int changes);
}
