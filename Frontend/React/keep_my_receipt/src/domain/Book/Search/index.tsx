import React, { useEffect, useState } from 'react';
import {
  Container,
  IconButton,
  Box,
  Grid,
  Stack,
  CircularProgress,
  Typography,
} from '@mui/material';
import SearchBar from '../../../components/SearchBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import * as qs from 'qs';
import SearchList from './List';
import SearchHeader from './Header';

export default function BookSearch() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState('');

  // 날짜
  const today = new Date();
  // 기본 1년 전
  const targetStart = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate(),
  );
  const targetEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  // history
  const [res, setRes] = useState({
    expenditure: 0,
    income: 0,
    result: {
      list: [],
    },
  });
  const { expenditure, income, result } = res;
  const [checkAdd, setCheckAdd] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const HistoryAxios = axios.create({
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  });
  const getHistory = async (page?: number, query?: string) => {
    await HistoryAxios.get(`/api/spring/club/${id}/transactions`, {
      params: {
        // clubId: id,
        start: `${targetStart.getFullYear()}-${
          targetStart.getMonth() + 1 > 9
            ? targetStart.getMonth() + 1
            : '0' + (targetStart.getMonth() + 1)
        }-01`,
        end: `${targetEnd.getFullYear()}-${
          targetEnd.getMonth() + 1 > 9
            ? targetEnd.getMonth() + 1
            : '0' + (targetEnd.getMonth() + 1)
        }-${
          today.getMonth() === targetEnd.getMonth()
            ? today.getDate()
            : targetEnd.getDate()
        }`,
        page: page ? page : 0,
        size: 10,
        sort: ['pay_date,DESC', 'id,DESC'],
        query: query ? query : word ? word : '',
      },
    })
      .then((res) => {
        console.log(
          targetStart.toLocaleDateString() +
            ' ~ ' +
            targetEnd.toLocaleDateString(),
        );
        console.log(res.data.data);
        const response = res.data.data;
        setRes(response);
        if (historyList.length === 0) {
          setHistoryList(response.result.list);
        } else {
          setHistoryList((prev) => [...prev, ...response.result.list]);
        }
        if (response.result.pageNumber < response.result.totalPages - 1) {
          setCheckAdd(true);
        } else {
          setCheckAdd(false);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onSearch = () => {
    setHistoryList([]);
    getHistory();
  };

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <Container maxWidth="md" sx={{ paddingY: 0, paddingX: '1rem' }}>
      <Grid container direction="column" sx={{ marginBottom: 1 }}>
        {/* 상단 & 검색창*/}
        <SearchHeader
          expenditure={expenditure}
          income={income}
          value={word}
          setValue={setWord}
          onSearch={onSearch}
          targetStart={targetStart}
          targetEnd={targetEnd}
        />
        {/* 거래내역 검색 결과 */}
        {loading ? (
          <Stack alignItems="center" marginTop="5rem">
            <CircularProgress sx={{ color: '#ffa500' }} />
          </Stack>
        ) : result.list.length > 0 ? (
          <Box>
            <SearchList
              result={result}
              historyList={historyList}
              getHistory={getHistory}
              checkAdd={checkAdd}
            />
          </Box>
        ) : (
          <Typography sx={{ textAlign: 'center', marginTop: '2rem' }}>
            검색 결과가 없습니다
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
