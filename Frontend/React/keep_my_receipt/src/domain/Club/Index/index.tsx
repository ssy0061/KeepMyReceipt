import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Stack } from '@mui/material';
import axios from 'axios';
import IndexList from './List';
import IndexHeader from './header';

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
  const [clubList, setClubList] = useState<listItemTypes[]>([]);
  const getClubList = async () => {
    await axios
      .get('https://k6d104.p.ssafy.io/api/spring/clubs/joined', {
        params: {
          page: 0,
          size: 5,
          sort: 'id%2CASC',
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setClubList(response.data.data.list);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getClubList();
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container direction="column" sx={{ marginBottom: 3 }}>
        {/* Header */}
        <IndexHeader />

        {/* 리스트 */}
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          sx={{ marginTop: '1rem' }}
        >
          {clubList.length ? (
            <IndexList clubList={clubList} />
          ) : (
            <p>모임 없음</p>
          )}
        </Stack>
      </Grid>
    </Container>
  );
}
