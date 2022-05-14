package com.ieung.receipt.repository;

import com.ieung.receipt.entity.QAsset;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.YearMonth;

@Repository
@Transactional
public class AssetRepoCommonImpl implements AssetRepoCommon {
    private final JPAQueryFactory queryFactory;
    private EntityManager em;

    public AssetRepoCommonImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
        this.em = em;
    }

    @Override
    public void updateBalanceByClubIdAndLcNameAndAscNameAndDate(Long clubId, String lcName, String ascName, YearMonth date, int changes) {
        queryFactory.update(QAsset.asset)
                .set(QAsset.asset.balance, QAsset.asset.balance.add(changes))
                .where(QAsset.asset.club.id.eq(clubId),
                        QAsset.asset.lcName.eq(lcName),
                        QAsset.asset.ascName.eq(ascName),
                        QAsset.asset.date.goe(date))
                .execute();
    }
}
