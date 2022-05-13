package com.ieung.receipt.repository;

import org.springframework.stereotype.Repository;

@Repository
public interface AssetSCategoryRepoCommon {
    void updateBalanceByClubIdAndAscName(Long clubId, String ascName, int changes);
}
