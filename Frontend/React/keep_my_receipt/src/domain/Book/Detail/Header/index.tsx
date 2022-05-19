import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, IconButton, Stack, Typography, Button } from '@mui/material';
import { ArrowLeft, ArrowRight, Search } from '@mui/icons-material';
import toCurrency from '../../../../services/toCurrency';
import { apiDeleteTransaction } from '../../api/bookApi';

interface DetailHeaderProps {
  state: any;
  params: any;
}

export default function DetailHeader({ state, params }: DetailHeaderProps) {
  const navigate = useNavigate();
  const { date, totalPrice, receiptUrl } = state;
  const onClickButton = () => {
    console.log('영수증 보여주기');
  };
  return (
    <Stack width="100%">
      <Stack paddingLeft="1rem">
        <h2>거래내역 상세</h2>
      </Stack>

      <Stack paddingX="1rem">
        {/* 날짜, 총금액 */}
        <Stack marginY={1}>
          <Stack direction="row" spacing="1rem" justifyContent="space-between">
            <Typography sx={{ fontSize: '1rem' }}>날짜</Typography>
            <Typography sx={{ fontSize: '1rem' }}>
              <b>{date}</b>
            </Typography>
          </Stack>
          <Stack direction="row" spacing="1rem" justifyContent="space-between">
            <Typography sx={{ fontSize: '1rem' }}>총금액</Typography>
            <Typography sx={{ fontSize: '1rem' }}>
              <b>{toCurrency(totalPrice)}</b>
            </Typography>
          </Stack>
        </Stack>
        {/* 영수증 확인 */}
        <Button
          fullWidth
          variant="contained"
          onClick={onClickButton}
          disabled={!receiptUrl ? true : false}
        >
          {receiptUrl ? '영수증 확인' : '영수증 없음'}
        </Button>
        {/* 수정, 삭제 버튼 */}
        <Stack direction="row" justifyContent="space-around" marginTop={1}>
          <Button
            onClick={() => {
              navigate('../create', { state: state });
            }}
            variant="text"
          >
            수정
          </Button>
          <Button
            onClick={async () => {
              if (confirm('삭제하시겠습니까?')) {
                await apiDeleteTransaction(params.transactionId);
              }
            }}
            variant="text"
            color="warning"
          >
            삭제
          </Button>
        </Stack>
      </Stack>
      {/* 경계선 */}
      <Box
        width="100%"
        height="0.5rem"
        sx={{ backgroundColor: '#eeeeee', marginBottom: '1rem' }}
      />
    </Stack>
  );
}
