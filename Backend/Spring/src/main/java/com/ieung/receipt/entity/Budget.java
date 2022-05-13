package com.ieung.receipt.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.YearMonth;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "budget")
// 예산운영표 테이블
public class Budget {
    // 예산운영표 고유 키 값
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    private Long id;

    // 모임
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name = "club_id")
    private Club club;

    // 연월
    @Column(nullable = false)
    private YearMonth date;

    // 소분류명
    @Column(nullable = false)
    private String smallCategory;

    // 현금 변동
    @Column(nullable = false)
    private Integer changes;

    public void updateChange(int change) {
        this.changes = changes;
    }
}
