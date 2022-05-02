package com.ieung.receipt.repository;

import com.ieung.receipt.entity.Club;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClubRepoCommon {
    Page<Club> findAllByName(String name, Pageable pageable);
}






































