package com.ieung.receipt.repository;

import com.ieung.receipt.entity.TransactionDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionDetailRepository extends JpaRepository<TransactionDetail, Long> {
}
