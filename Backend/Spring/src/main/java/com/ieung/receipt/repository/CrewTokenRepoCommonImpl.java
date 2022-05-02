package com.ieung.receipt.repository;

import com.ieung.receipt.entity.CrewToken;
import com.ieung.receipt.entity.QCrewToken;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.Optional;

public class CrewTokenRepoCommonImpl implements CrewTokenRepoCommon {
    private final JPAQueryFactory queryFactory;
    private EntityManager em;

    public CrewTokenRepoCommonImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
        this.em = em;
    }

    @Override
    public CrewToken findByFcmToken(String fcmToken) {
        CrewToken result = queryFactory
                .select(QCrewToken.crewToken)
                .from(QCrewToken.crewToken)
                .where(QCrewToken.crewToken.fcmToken.eq(fcmToken))
                .fetchOne();

        return result;
    }

    @Override
    public Optional<CrewToken> findByCrewIdAndRefreshToken(Long crewId, String refreshToken) {
        Optional<CrewToken> result = Optional.ofNullable(queryFactory
                .select(QCrewToken.crewToken)
                .from(QCrewToken.crewToken)
                .where(QCrewToken.crewToken.refreshToken.eq(refreshToken),
                        QCrewToken.crewToken.crew.id.eq(crewId))
                .fetchOne());

        return result;
    }
}
