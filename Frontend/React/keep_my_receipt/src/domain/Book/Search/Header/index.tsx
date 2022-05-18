import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import toCurrency from '../../../../services/toCurrency';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchBar from '../../../../components/SearchBar';

interface IndexHeaderProps {
  expenditure: number;
  income: number;
  value: string;
  setValue: any;
  onSearch: any;
  targetStart: Date;
  targetEnd: Date;
}

export default function SearchHeader({
  expenditure,
  income,
  value,
  setValue,
  onSearch,
  targetStart,
  targetEnd,
}: IndexHeaderProps) {
  return (
    <Stack width="100%">
      <Stack paddingLeft="1rem">
        {/* 검색 창 */}
        <Stack direction="row" justifyContent="center">
          <SearchBar
            value={value}
            setValue={setValue}
            onSearch={onSearch}
            navi={'.'}
            placeholder="내역 및 태그를 입력해주세요"
          />
        </Stack>

        {/* 지출 & 수입 */}
        <Stack marginY={1}>
          <Stack direction="row" spacing="1rem">
            <Typography sx={{ fontSize: '1.2rem' }}>지출</Typography>
            <Typography sx={{ fontSize: '1.2rem' }} color="#aa2626">
              <b>{toCurrency(expenditure)}</b>
            </Typography>
          </Stack>
          <Stack direction="row" spacing="1rem">
            <Typography sx={{ fontSize: '1.2rem' }}>수입</Typography>
            <Typography sx={{ fontSize: '1.2rem' }} color="#4caf50">
              <b>{toCurrency(income)}</b>
            </Typography>
          </Stack>
        </Stack>
        {/* 기간 */}
        <Stack direction="row" alignItems="center">
          <Typography>
            <b>
              {targetStart.toLocaleDateString() +
                ' ~ ' +
                targetEnd.toLocaleDateString()}
            </b>
          </Typography>
          <p>기간설정</p>
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
