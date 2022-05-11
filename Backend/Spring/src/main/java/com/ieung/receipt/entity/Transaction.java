package com.ieung.receipt.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transaction")
public class Transaction extends BaseEntity {
    // 거래 내역 고유 키값
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long id;

    // 연관된 모임
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "club_id")
    private Club club;

    // 지불 날짜
    @Column(nullable = false)
    private LocalDate payDate;

    // 총 금액
    @Column(nullable = false)
    private int price;

    // 메모
    @Column(nullable = false)
    private String memo;

    // 승인자 crewId
    @Column(nullable = false)
    private Long approveCrewId;

    // 신청자 crewId
    @Column(nullable = false)
    private int requestCrewId;

    // 청구 내역
    @Column
    private Request request;
}
