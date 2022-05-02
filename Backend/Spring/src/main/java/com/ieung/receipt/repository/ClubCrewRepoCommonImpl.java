package com.ieung.receipt.repository;

import com.ieung.receipt.code.StateCode;
import com.ieung.receipt.entity.ClubCrew;
import com.ieung.receipt.entity.QClubCrew;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public class ClubCrewRepoCommonImpl implements ClubCrewRepoCommon {
    private final JPAQueryFactory queryFactory;
    private EntityManager em;

    public ClubCrewRepoCommonImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
        this.em = em;
    }

    @Override
    public Optional<ClubCrew> findByCrewIdAndClubId(Long crewId, Long clubId) {
        Optional<ClubCrew> result = Optional.ofNullable(queryFactory
                .select(QClubCrew.clubCrew)
                .from(QClubCrew.clubCrew)
                .where(QClubCrew.clubCrew.crew.id.eq(crewId),
                        QClubCrew.clubCrew.club.id.eq(clubId))
                .fetchOne());

        return result;
    }

    @Override
    public Long findApprovedCountByClubId(Long clubId) {
        Long result = queryFactory
                .select(QClubCrew.clubCrew.count())
                .from(QClubCrew.clubCrew)
                .where(QClubCrew.clubCrew.club.id.eq(clubId),
                        QClubCrew.clubCrew.state.eq(StateCode.APPROVE))
                .fetchOne();

        return result;
    }
}






































