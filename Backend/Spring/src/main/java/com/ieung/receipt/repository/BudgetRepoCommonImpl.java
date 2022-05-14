package com.ieung.receipt.repository;

import com.ieung.receipt.entity.QAsset;
import com.ieung.receipt.entity.QBudget;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.YearMonth;

@Repository
@Transactional
public class BudgetRepoCommonImpl implements BudgetRepoCommon {
    private final JPAQueryFactory queryFactory;
    private EntityManager em;

    public BudgetRepoCommonImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
        this.em = em;
    }

    @Override
    public void updateChangesByClubIdAndLcNameAndBscNameAndDate(Long clubId, String lcName, String bscName, YearMonth date, int changes) {
        queryFactory.update(QBudget.budget)
                .set(QBudget.budget.changes, QBudget.budget.changes.add(changes))
                .where(QBudget.budget.club.id.eq(clubId),
                        QBudget.budget.lcName.eq(lcName),
                        QBudget.budget.bscName.eq(bscName),
                        QBudget.budget.date.goe(date))
                .execute();
    }
}
