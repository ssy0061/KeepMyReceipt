import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import toCurrency from '../../../../services/toCurrency';

export default function IndexHeader() {
  return (
    <>
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
          지출 <b>{toCurrency(200000)}</b>
        </Typography>
        <Typography>
          수입 <b>{toCurrency(1000000)}</b>
        </Typography>
      </Box>
    </>
  );
}
