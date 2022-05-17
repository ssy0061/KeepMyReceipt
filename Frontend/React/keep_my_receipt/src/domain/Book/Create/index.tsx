import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import Header from './Header';
import PageButtons from './PageButtons';
import Item from './Item';
import bookReducer, {
  updateBook,
  initBookState,
  toTransactionType,
} from '../bookReducer';
import { apiCreateTransaction } from '../api/bookApi';
import { CreateParamType } from '../types';
import { GreenBox } from '../../../styles/box';
import { PageTitleTypography } from '../../../styles/typography';

export default function BookCreate() {
  const { id: clubId } = useParams();
  const location = useLocation();
  const params = location.state as CreateParamType;
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(
    bookReducer,
    initBookState(params, Number(clubId)),
  );
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

  const createTransaction = async () => {
    const requestId = params && params.requestId;
    const payload = toTransactionType(state, requestId);
    await apiCreateTransaction(Number(clubId), payload).then((res) => {
      res.data.msg === '성공' ? navigate(`/club/${clubId}/book`) : null;
    });
  };

  useEffect(() => {
    sumTotalValue();
  }, [state.items]);

  useEffect(() => {
    console.log('state', state);
    console.log('page', page);
    console.log('params', params);
  }, [state, page]);

  return (
    <Container maxWidth="md" sx={{ display: 'grid', marginBottom: 8 }}>
      <GreenBox marginX={-2} marginBottom={1}>
        <PageTitleTypography>거래등록</PageTitleTypography>
      </GreenBox>

      {/* 거래 정보 */}
      <Header
        date={state.date}
        totalValue={state.totalPrice}
        length={state.items.length}
        imageUrl={state.imageUrl}
        dispatch={dispatch}
        editable={!params}
      />

      {/* 페이지네이션 버튼들 */}
      <PageButtons
        count={state.items.length}
        page={page}
        setPage={setPage}
        dispatch={dispatch}
        editable={!params}
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

      <Button onClick={createTransaction}>등록!</Button>
    </Container>
  );
}
