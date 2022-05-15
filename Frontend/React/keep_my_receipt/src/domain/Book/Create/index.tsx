import { useCallback, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import Navigation from '../../../header';
import Header from './Header';
import PageButtons from './PageButtons';
import Item from './Item';
import bookReducer, { updateBook, blankBook } from '../bookReducer';

export default function BookCreate() {
  const { id: clubId } = useParams();

  const [state, dispatch] = useReducer(bookReducer, blankBook);
  const [page, setPage] = useState(1);

  // 금액 총합을 누적해서 계산
  // 아이템에 변화가 생길 때마다 재생성
  const sumTotalValue = useCallback(() => {
    const newTotalValue = state.items.reduce((prev, cur) => {
      return prev + parseInt(cur.price.toString());
    }, 0);
    if (newTotalValue !== state.totalPrice) {
      dispatch(updateBook('totalPrice', newTotalValue));
    }
  }, [state.items]);

  useEffect(() => {
    sumTotalValue();
  }, [state.items]);

  useEffect(() => {
    console.log('state', state);
    console.log('page', page);
    // console.log('params', params);
  }, [state, page]);

  return (
    <Container maxWidth="md">
      <Navigation />
      {/* 거래 정보 */}
      <Header
        date={state.date}
        totalValue={state.totalPrice}
        length={state.items.length}
        dispatch={dispatch}
      />

      {/* 페이지네이션 버튼들 */}
      <PageButtons
        count={state.items.length}
        page={page}
        setPage={setPage}
        dispatch={dispatch}
      />

      {/* 각각의 항목 정보들 */}
      {/* 현재 참조하는 아이템이 있을 때만 조건부 렌더링 */}
      {clubId && state.items[page - 1] && (
        // 페이지네이션에 따라 한 개씩만 보여줘야 함
        <Item
          clubId={clubId}
          item={state.items[page - 1]}
          itemIndex={page - 1}
          dispatch={dispatch}
        />
      )}
    </Container>
  );
}
