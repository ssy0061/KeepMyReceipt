import React, { memo } from 'react';
import { Button, Stack, TextField } from '@mui/material';

import { BookAction, updateBook } from '../../bookReducer';
import toCurrency from '../../../../services/toCurrency';

interface HeaderType {
  date: string;
  totalValue: number;
  length: number;
  dispatch: React.Dispatch<BookAction>;
}

function Header({ date, totalValue, length, dispatch }: HeaderType) {
  const changeDate = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(updateBook('date', event.target.value));
  };

  return (
    <>
      <Stack>
        <h1 style={{ textAlign: 'center' }}>거래등록</h1>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <p>날짜</p>
          <TextField
            type="date"
            defaultValue={date}
            onChange={changeDate}
            variant="standard"
            // label="시작일"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            // style={{ width: '100%' }}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <p>총금액</p>
          <p>{toCurrency(totalValue)}</p>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <p>거래 개수</p>
          <p>{length}</p>
        </Stack>
        <Button variant="contained" color="secondary">
          영수증 확인하기
        </Button>
      </Stack>
    </>
  );
}

export default memo(Header);
