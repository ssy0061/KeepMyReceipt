package com.ieung.receipt.repository;

import com.ieung.receipt.entity.CrewToken;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CrewTokenRepoCommon {
    // fcmToken으로 조회
    CrewToken findByFcmToken(String fcmToken);

    // crewId와 refreshToken으로 조회
    Optional<CrewToken> findByCrewIdAndRefreshToken(Long crewId, String refreshToken);
}
