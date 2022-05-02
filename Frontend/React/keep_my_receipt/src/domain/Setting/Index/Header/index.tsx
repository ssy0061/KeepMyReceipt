import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

export default function IndexHeader() {
  return (
    <>
      {/* 월 바꾸는 화살표들*/}
      <Stack direction="row" alignItems="center">
        <IconButton size="large">
          <ArrowLeft />
        </IconButton>
        {/* 현재 월 표시 */}
        <Typography variant="h5">4월</Typography>
        <IconButton size="large">
          <ArrowRight />
        </IconButton>
      </Stack>

      {/* 지출 & 수입 */}
      <Box marginY={3}>
        <Typography alignSelf="center">
          지출 <b>200000원</b>
        </Typography>
        <Typography>
          수입 <b>1000000원</b>
        </Typography>
      </Box>
    </>
  );
}
