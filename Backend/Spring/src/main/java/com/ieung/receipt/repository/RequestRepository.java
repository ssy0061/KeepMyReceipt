package com.ieung.receipt.repository;

import com.ieung.receipt.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long>, RequestRepoCommon {
}
