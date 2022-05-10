import { useCallback, useEffect, useReducer, useState } from 'react';
import { Container } from '@mui/material';

import Header from './Header';
import PageButtons from './PageButtons';
import Item from './Item';
import bookReducer, { updateBook } from '../bookReducer';
import bookSample from './sample.json';

export default function BookCreate() {
  const [state, dispatch] = useReducer(bookReducer, bookSample);
  const [page, setPage] = useState(1);

  // 금액 총합을 누적해서 계산
  // 아이템에 변화가 생길 때마다 재생성
  const sumTotalValue = useCallback(() => {
    const newTotalValue = state.items.reduce((prev, cur) => {
      return prev + parseInt(cur.itemValue.toString());
    }, 0);
    if (newTotalValue !== state.totalValue) {
      dispatch(updateBook('totalValue', newTotalValue));
    }
  }, [state.items]);

  useEffect(() => {
    sumTotalValue();
  }, [state.items]);

  useEffect(() => {
    console.log('state', state);
    console.log('page', page);
  }, [state, page]);

  return (
    <Container maxWidth="md">
      {/* 거래 정보 */}
      <Header
        date={state.date}
        totalValue={state.totalValue}
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
      {state.items[page - 1] && (
        // 페이지네이션에 따라 한 개씩만 보여줘야 함
        <Item
          item={state.items[page - 1]}
          itemIndex={page - 1}
          dispatch={dispatch}
        />
      )}
    </Container>
  );
}
