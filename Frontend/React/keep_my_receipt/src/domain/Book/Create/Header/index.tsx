import React, { memo } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
// import { Schedule, PointOfSale } from '@mui/icons-material';

import DialogWithIconButton from '../../../../components/DialogWithIconButton';
import { BookAction, updateBook } from '../../bookReducer';
import toCurrency from '../../../../services/toCurrency';

interface HeaderType {
  date: string;
  totalValue: number;
  length: number;
  imageUrl?: string;
  dispatch: React.Dispatch<BookAction>;
  editable: boolean;
}

function Header(props: HeaderType) {
  const changeDate = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    props.dispatch(updateBook('date', event.target.value));
  };

  return (
    <>
      <Stack>
        {/* 날짜 */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1}
        >
          <Typography>날짜</Typography>
          {props.editable ? (
            // 날짜 수정 가능
            <TextField
              type="date"
              defaultValue={props.date}
              onChange={changeDate}
              variant="standard"
            />
          ) : (
            // 영수증 승인에서 넘어온거면 날짜 수정 불가
            <Typography>{props.date}</Typography>
          )}
        </Stack>

        {/* 총금액 */}
        <Stack direction="row" justifyContent="space-between" marginBottom={1}>
          <Typography>총금액</Typography>
          <Typography>{toCurrency(props.totalValue)}</Typography>
        </Stack>

        {/* 거래 개수 */}
        <Stack direction="row" justifyContent="space-between" marginBottom={1}>
          <Typography>거래 개수</Typography>
          <Typography>{props.length}</Typography>
        </Stack>

        {/* 영수증 사진 확인 */}
        {props.imageUrl ? (
          <DialogWithIconButton
            icon={
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginTop: 1 }}
                fullWidth
              >
                영수증 확인
              </Button>
            }
            content={<img src={props.imageUrl} />}
          />
        ) : (
          <Button disabled variant="outlined" sx={{ marginTop: 1 }}>
            영수증 없음
          </Button>
        )}
      </Stack>
    </>
  );
}

export default memo(Header);
