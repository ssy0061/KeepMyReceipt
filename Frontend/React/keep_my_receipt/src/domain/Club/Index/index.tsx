import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Stack } from '@mui/material';
import axios from 'axios';
import IndexList from './List';
import IndexHeader from './header';
import Pagination from '../../../components/Pagination';

interface listItemTypes {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface resopnseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: listItemTypes[];
}
export default function ClubIndex() {
  // 모임 목록 조회
  const [res, setRes] = useState<resopnseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const { list } = res || null;
  const getClubList = async (page?: number) => {
    await axios
      .get('https://k6d104.p.ssafy.io/api/spring/clubs/joined', {
        params: {
          page: page ? page : 0,
          size: 5,
          sort: 'id,DESC',
        },
      })
      .then((response) => {
        // console.log(response);
        // console.log(response.data.data);
        setRes(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getClubList(0);
  }, []);
  return (
    <Container maxWidth="md" sx={{ padding: 0 }}>
      <Grid container direction="column" sx={{ marginBottom: 3 }}>
        {/* Header */}
        <IndexHeader />
        {/* 리스트 */}
        <Stack direction="column" justifyContent="space-between" spacing={2}>
          <Stack
            direction="column"
            spacing={2}
            alignItems="center"
            sx={{ marginTop: '1rem' }}
          >
            {list.length ? <IndexList clubList={list} /> : <p>모임 없음</p>}
          </Stack>
          {/* 페이지네이션 */}
          <Pagination
            pageInfo={res}
            paginationSize={5}
            onClickPage={getClubList}
            bgColor="#ffaa00"
          />
        </Stack>
      </Grid>
    </Container>
  );
}
