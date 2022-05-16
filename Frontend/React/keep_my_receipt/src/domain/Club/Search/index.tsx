import React, { useEffect, useState } from 'react';
import {
  Container,
  IconButton,
  Grid,
  Stack,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';
import SearchList from './List';
import axios from 'axios';
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

export default function GroupSearch() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyWord = searchParams.get('query');
  const [word, setWord] = useState('');
  const [res, setRes] = useState<resopnseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const { list } = res || null;

  useEffect(() => {
    if (keyWord) {
      setWord(keyWord);
      getClubList();
    } else {
      getClubList();
    }
  }, [keyWord]);

  const getClubList = async (page?: number) => {
    await axios
      .get('https://k6d104.p.ssafy.io/api/spring/clubs', {
        params: {
          name: keyWord ? keyWord : word,
          page: page ? page : 0,
          size: 5,
          sort: 'id,DESC',
        },
      })
      .then((response) => {
        setRes(response.data.data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 0, paddingX: '1rem' }}>
      <Grid container direction="column" sx={{ marginBottom: 3 }}>
        {/* 상단 */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          sx={{ position: 'relative' }}
        >
          <IconButton
            onClick={() => {
              // navigate('../');
              navigate(-1);
            }}
            color="inherit"
            sx={{ position: 'absolute', left: 0 }}
          >
            <ArrowBack sx={{ fontSize: '1.8rem' }} />
          </IconButton>
          {/* 검색 창 */}
          <SearchBar
            value={word}
            setValue={setWord}
            onSearch={getClubList}
            navi={'.'}
          />
        </Stack>
        {loading ? (
          <Stack alignItems="center" marginTop="5rem">
            <CircularProgress sx={{ color: '#ffa500' }} />
          </Stack>
        ) : (
          <>
            {/* 검색 결과 */}
            <Stack
              direction="column"
              spacing={2}
              alignItems="center"
              sx={{ marginTop: '1rem' }}
            >
              {/* 상단 */}
              {keyWord ? null : '전체 모임 목록'}
              {/* 리스트 */}
              {list.length ? (
                <SearchList clubList={list} />
              ) : (
                <p>검색된 모임이 없습니다.</p>
              )}
              {/* 페이지네이션 */}
              <Pagination
                pageInfo={res}
                paginationSize={5}
                onClickPage={getClubList}
                bgColor="#ffaa00"
              />
            </Stack>
          </>
        )}
      </Grid>
    </Container>
  );
}
