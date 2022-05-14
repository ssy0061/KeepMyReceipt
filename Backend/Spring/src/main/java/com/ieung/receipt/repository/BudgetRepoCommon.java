package com.ieung.receipt.repository;

import org.springframework.stereotype.Repository;

import java.time.YearMonth;

@Repository
public interface BudgetRepoCommon {
    void updateChangesByClubIdAndLcNameAndBscNameAndDate(Long clubId,String lcName, String bscName, YearMonth date, int changes);
}
