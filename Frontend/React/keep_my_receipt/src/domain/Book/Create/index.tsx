import { useCallback, useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';

import Header from './Header';
import Item from './Item';
import bookReducer, { updateBook, initBookState } from '../bookReducer';
import {
  apiCreateTransaction,
  apiUpdateTransaction,
  apiValidateCreateTransaction,
  toTransactionType,
} from '../api/bookWriteApi';
import { ReceiptStateType } from '../types';
import DeleteButton from './DeleteButton';
import AddButton from './AddButton';
import { ReadTransactionResType } from '../api/bookReadApi';

export default function BookCreate() {
  // 주소에 있는 모임 ID 가져옴
  const { id: clubId } = useParams();
  // 이전 페이지에서 보낸 데이터 받음
  const location = useLocation();
  const params = location.state as ReceiptStateType | ReadTransactionResType;
  const isUpdate = () => params && 'transactionId' in params;
  // 다음 페이지로 보내기 위한 변수 선언
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
      return prev + (cur.price ? cur.price : 0);
    }, 0);
    if (newTotalValue !== state.totalPrice) {
      dispatch(updateBook('totalPrice', newTotalValue));
    }
  }, [state.items]);

  const createTransaction = async () => {
    const requestId = params && params.requestId;
    const payload = toTransactionType(state, requestId);
    if (apiValidateCreateTransaction(payload)) {
      if (confirm('등록하시겠습니까?')) {
        await apiCreateTransaction(Number(clubId), payload).then((res) => {
          res.data.msg === '성공' ? navigate(`/club/${clubId}/book`) : null;
        });
      }
    }
  };

  const updateTransaction = async () => {
    const transactionId =
      'transactionId' in params ? params.transactionId : null;
    const requestId = 'requestId' in params ? params.requestId : null;
    const payload = toTransactionType(state, requestId);

    if (apiValidateCreateTransaction(payload)) {
      if (confirm('등록하시겠습니까?')) {
        await apiUpdateTransaction(transactionId, payload).then((res) => {
          res.data.msg === '성공'
            ? navigate(`/club/${clubId}/book/detail`, {
                state: {
                  transactionId: transactionId,
                  transactionDetailId: state.items[0].transactionDetailId,
                },
              })
            : null;
        });
      }
    }
  };

  useEffect(() => {
    sumTotalValue();
  }, [state.items]);

  useEffect(() => {
    console.log('BookCreate params', params);
  }, []);

  return (
    <Container maxWidth="md" sx={{ display: 'grid', marginBottom: 8 }}>
      <h2>{isUpdate() ? '거래수정' : '거래등록'}</h2>

      {/* 거래 정보 */}
      <Header
        date={state.date}
        totalValue={state.totalPrice}
        length={state.items.length}
        imageUrl={state.imageUrl}
        dispatch={dispatch}
        editable={!(params && params.requestId)}
      />

      {/* 페이지네이션 버튼들 */}
      {/* <PageButtons
        count={state.items.length}
        page={page}
        setPage={setPage}
        dispatch={dispatch}
        editable={!params}
      /> */}

      {/* 각각의 항목 정보들 */}
      {/* 현재 참조하는 아이템이 있을 때만 조건부 렌더링 */}
      {/* {clubId && state.items[page - 1] && (
        // 페이지네이션에 따라 한 개씩만 보여줘야 함
        <Item
          clubId={clubId}
          item={state.items[page - 1]}
          itemIndex={page - 1}
          dispatch={dispatch}
        />
      )} */}

      {/* 각각의 항목 정보들 */}
      {state.items.map((item, index) => (
        <div key={index}>
          <Item
            clubId={clubId}
            item={item}
            itemIndex={index}
            dispatch={dispatch}
            currencyEditable={params && 'requestId' in params}
          />
        </div>
      ))}

      <Box justifySelf="end">
        항목
        <AddButton page={page} setPage={setPage} dispatch={dispatch} />
        <DeleteButton page={page} setPage={setPage} dispatch={dispatch} />
      </Box>

      <Button
        onClick={isUpdate() ? updateTransaction : createTransaction}
        variant="contained"
      >
        등록!
      </Button>
    </Container>
  );
}
