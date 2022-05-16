import { Box, Divider, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import toCurrency from '../../../../services/toCurrency';
import ListItem from '../ListItem';
import sample from './sample.json';

export default function BookList({ list }: { list: any }) {
  // 샘플 파일 불러오기
  const sampleList = sample;

  return (
    <>
      {list.map((item: any) => (
        <Stack
          key={item.transactionDetailId}
          direction="row"
          justifyContent="space-between"
        >
          <Typography>{item.date}</Typography>
          <Typography>{item.name}</Typography>
          <Typography>{item.price}</Typography>
        </Stack>
      ))}

      <p>sample</p>
      {sampleList.map((sample) => (
        <Box key={sample.date}>
          <Stack
            direction="row"
            justifyContent="space-between"
            marginTop={3}
            marginBottom={1}
          >
            {/* 왼쪽 끝에 날짜 출력 */}
            <Typography>{sample.date.slice(8) + '일'}</Typography>
            {/* 오른쪽 끝에 수입과 지출 */}
            <Typography>
              {sample.earn ? '+' + toCurrency(sample.earn) : ''}
              <br />
              {toCurrency(sample.cost)}
            </Typography>
          </Stack>
          <Divider />
          {/* 해당 날짜의 모든 거래 내역 출력 */}
          <ListItem items={sample.items} />
        </Box>
      ))}
    </>
  );
}
