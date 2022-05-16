import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import toCurrency from '../../../../services/toCurrency';

export default function IndexHeader() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const febDay = new Date(year, 2, 0);
  const day29 = new Date(2020, 2, 0);
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  console.log('2022년 2월 마지막 날 ' + febDay.toLocaleDateString());
  console.log('2020년 2월 마지막 날 ' + day29.toLocaleDateString());
  console.log('api 요청 start: ' + start.toLocaleDateString());
  console.log('api 요청 end: ' + end.toLocaleDateString());
  return (
    <>
      <Stack direction="row" alignItems="center">
        <IconButton size="large">
          <ArrowLeft />
        </IconButton>
        {/* 현재 월 표시 */}
        <Typography variant="h5">{month + 1} 월</Typography>
        <IconButton size="large">
          <ArrowRight />
        </IconButton>
      </Stack>

      {/* 지출 & 수입 */}
      <Box marginY={3}>
        <Typography alignSelf="center">
          지출 <b>{toCurrency(200000)}</b>
        </Typography>
        <Typography>
          수입 <b>{toCurrency(1000000)}</b>
        </Typography>
      </Box>
    </>
  );
}
