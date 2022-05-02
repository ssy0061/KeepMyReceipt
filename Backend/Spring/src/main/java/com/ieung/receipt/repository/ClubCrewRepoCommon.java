package com.ieung.receipt.repository;

import com.ieung.receipt.entity.ClubCrew;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClubCrewRepoCommon {
    Optional<ClubCrew> findByCrewIdAndClubId(Long crewId, Long clubId);
    Long findApprovedCountByClubId(Long clubId);
}






































