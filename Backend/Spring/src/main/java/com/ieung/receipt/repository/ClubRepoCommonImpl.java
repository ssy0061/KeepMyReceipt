package com.ieung.receipt.repository;

import com.ieung.receipt.entity.Club;
import com.ieung.receipt.entity.QClub;
import com.ieung.receipt.entity.QClubCrew;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Optional;

@Repository
@Transactional
public class ClubRepoCommonImpl implements ClubRepoCommon {
    private final JPAQueryFactory queryFactory;
    private EntityManager em;

    public ClubRepoCommonImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
        this.em = em;
    }
}






































