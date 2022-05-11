package com.ieung.receipt.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transaction_detail")
public class TransactionDetail {
    // 상세 거래 내역 고유 키값
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_detail_id")
    private Long id;

    // 연관된 거래 내역
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    // 상세 항목 내용
    @Column(length = 255, nullable = false)
    private String content;

    // 개수
    @Column(nullable = false)
    private Integer count;

    // 가격
    @Column(nullable = false)
    private Integer price;

    // Tag 테이블과 매핑 예정
    @Column(nullable = false)
    private Long largeTagId;

    // Tag 테이블과 매핑 예정
    @Column
    private Long smallTagId;

    // 대분류
    @Column(nullable = false)
    private Long largeCategoryId;

    // 소분류
    @Column(nullable = false)
    private Long smallCategoryId;
}
