package com.ieung.receipt.entity;

import com.ieung.receipt.code.AuthCode;
import com.ieung.receipt.code.StateCode;
import com.ieung.receipt.converter.AuthCodeConverter;
import com.ieung.receipt.converter.StateCodeConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "club_crew")
public class ClubCrew {
    // 모임별 회원 고유 키값
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_crew_id")
    private long id;

    // 모임
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    // 회원
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    // 회원별 권한
    @Convert(converter = AuthCodeConverter.class)
    @Column(nullable = false, length = 10, columnDefinition = "varchar(10)")
    private AuthCode auth;

    // 처리 상태
    @Convert(converter = StateCodeConverter.class)
    @Column(nullable = false, length = 10, columnDefinition = "varchar(10)")
    private StateCode state;
}
