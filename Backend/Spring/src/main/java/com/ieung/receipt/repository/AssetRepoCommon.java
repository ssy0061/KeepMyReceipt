package com.ieung.receipt.repository;

import org.springframework.stereotype.Repository;

import java.time.YearMonth;

@Repository
public interface AssetRepoCommon {
    void updateBalanceByClubIdAndLcNameAndAscNameAndDate(Long clubId,  String lcName, String ascName, YearMonth date, int changes);
}
