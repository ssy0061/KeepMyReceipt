import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Stack } from '@mui/material';

import Header from '../Create/Header';
import PageButtons from '../Create/PageButtons';
import {
  apiDeleteTransaction,
  apiGetTransaction,
  ReadResponseType,
  initialReadResponse,
} from '../api/bookApi';
import { DetailParamType } from '../types';
import toCurrency from '../../../services/toCurrency';
import {
  PageTitleTypography,
  TitleTypographyWithSpace,
  ContentTypography,
} from '../../../styles/typography';
import { GreenBox } from '../../../styles/box';
import { OuterBox, InnerBox } from './style';

const createDictItem = (key: string, value: string) => ({
  key,
  value,
});

const detailItemInfo = [
  createDictItem('내용', 'name'),
  createDictItem('금액', 'price'),
  createDictItem('유형', 'type'),
  createDictItem('대분류', 'largeCategory'),
  createDictItem('소분류', 'smallCategory'),
  createDictItem('태그1', 'largeTag'),
  createDictItem('태그2', 'smallTag'),
  createDictItem('메모', 'memo'),
];

export default function BookDetail() {
  const location = useLocation();
  const params = location.state as DetailParamType;
  const navigate = useNavigate();

  // 임시로 추가

  const [state, setState] = useState<ReadResponseType>(initialReadResponse);
  const [page, setPage] = useState(1);

  const readTransaction = async (transactionId: number) => {
    await apiGetTransaction(transactionId).then((res) => {
      // console.log('readTransaction', res.data.data);

      // 아이템 설정
      const data: ReadResponseType = res.data.data;
      setState(data);

      // 페이지 설정
      if (params) {
        const targetItems = data.items.filter(
          (item) => item.transactionDetailId === params.transactionDetailId,
        );
        setPage(data.items.indexOf(targetItems[0]) + 1);
      }
    });
  };

  useEffect(() => {
    const transactionId = params ? params.transactionId : 21;
    readTransaction(transactionId);
  }, []);

  return (
    <Container maxWidth="md" sx={{ display: 'grid', marginBottom: 8 }}>
      <GreenBox sx={{ marginX: -2, marginBottom: 1 }}>
        <PageTitleTypography>거래 상세</PageTitleTypography>
      </GreenBox>

      {state && (
        <>
          {/* 거래 정보 */}
          <Header
            date={state.date}
            totalValue={state.totalPrice}
            length={state.items.length}
            editable={false}
          />

          {/* 페이지네이션 버튼들 */}
          <PageButtons
            count={state.items.length}
            page={page}
            setPage={setPage}
            editable={false}
          />

          <OuterBox>
            <InnerBox>
              {/* 각각의 항목 정보들 */}
              {/* 현재 참조하는 아이템이 있을 때만 조건부 렌더링 */}
              {state.items[page - 1] &&
                // 페이지네이션에 따라 한 개씩만 보여줘야 함
                detailItemInfo.map((info) => (
                  <Stack direction="row">
                    <TitleTypographyWithSpace>
                      {info.key}
                    </TitleTypographyWithSpace>
                    <ContentTypography>
                      {info.value === 'price'
                        ? toCurrency(state.items[page - 1][info.value])
                        : state.items[page - 1][info.value]}
                    </ContentTypography>
                  </Stack>
                ))}
            </InnerBox>
          </OuterBox>

          <Stack direction="row" justifyContent="space-around" marginTop={1}>
            <Button onClick={undefined} variant="contained">
              수정
            </Button>
            <Button
              onClick={async () => {
                if (confirm('정말로 삭제하시겠습니까?')) {
                  await apiDeleteTransaction(params.transactionId);
                }
              }}
              variant="contained"
              color="warning"
            >
              삭제
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
}
