package com.ieung.receipt.repository;

import com.ieung.receipt.code.JoinCode;
import com.ieung.receipt.entity.Crew;
import org.springframework.stereotype.Repository;

@Repository
public interface CrewRepoCommon {
    Crew findByEmail(String email);
}






































