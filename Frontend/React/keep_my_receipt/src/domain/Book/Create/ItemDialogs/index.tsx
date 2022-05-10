import React, { memo, useState } from 'react';
import { Divider, Stack, Switch, Typography } from '@mui/material';

export const MainCategoryDialog = memo(() => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Typography variant="h6">유형 선택 가이드</Typography>
      <Divider />
      <Typography fontWeight="bold">유형이란?</Typography>
      <Typography>
        보고서에 기록될 거래의 첫 번째 분류 기준입니다.
        <br />
        <br />
        보고서를 이용하지 않으신다면 아래 토글을 이용해 비활성화 하시면 거래
        작성이 보다 수월해집니다.
      </Typography>

      <Stack direction="row" alignItems="center">
        <Typography>Off</Typography>
        <Switch checked={checked} onChange={handleChange} />
        <Typography>On</Typography>
      </Stack>
    </>
  );
});
