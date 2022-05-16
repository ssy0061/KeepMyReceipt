import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import toCurrency from '../../../../services/toCurrency';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface IndexHeaderProps {
  month: number;
  setMonth: any;
  target: any;
  expenditure: number;
  income: number;
  checked: boolean;
}

export default function IndexHeader({
  month,
  setMonth,
  target,
  expenditure,
  income,
  checked,
}: IndexHeaderProps) {
  return (
    <>
      <Stack direction="row" alignItems="center" width="20rem">
        <IconButton onClick={() => setMonth(month - 1)}>
          <ArrowLeft sx={{ color: '#000000', fontSize: '2rem' }} />
        </IconButton>
        {/* 현재 연월 표시 */}
        <Typography variant="h5">
          {target.getFullYear()} 년 {target.getMonth() + 1} 월{' '}
        </Typography>
        <IconButton onClick={() => setMonth(month + 1)} disabled={checked}>
          <ArrowRight
            sx={{ color: checked ? '#5c5c5c' : '#000000', fontSize: '2rem' }}
          />
        </IconButton>
      </Stack>

      {/* 지출 & 수입 */}
      <Box marginY={3}>
        <Typography alignSelf="center">
          지출 <b>{toCurrency(expenditure)}</b>
        </Typography>
        <Typography>
          수입 <b>{toCurrency(income)}</b>
        </Typography>
      </Box>
    </>
  );
}
