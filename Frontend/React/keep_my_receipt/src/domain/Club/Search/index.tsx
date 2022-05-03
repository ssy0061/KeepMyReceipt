import React, { useEffect, useState } from 'react';
import SearchItem from './item';
import {
  Container,
  Box,
  TextField,
  IconButton,
  Grid,
  Stack,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';

type LocationState = { propWord: string; used: boolean };

export default function GroupSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyWord = searchParams.get('keyWord');
  const { propWord, used } = (location.state as LocationState) || {};
  const [word, setWord] = useState('');
  // const onChange = (e: any) => {
  //   setWord(e.target.value);
  // };
  // const searchWord = (w: string) => {
  //   if (w.length < 2) {
  //     console.log('검색은 2글자 이상');
  //     return;
  //   }
  //   console.log('모임 검색 API 요청' + '(검색어: ' + w + ')');
  // };

  useEffect(() => {
    // 새로고침하면 propWord로 되는 이슈 발생...
    if (!used && propWord) {
      console.log(
        'propWord로 모임 검색 API 요청' + '(검색어: ' + propWord + ')',
      );
      setWord(propWord);
      console.log(location);
    }
  }, []);
  useEffect(() => {
    if (keyWord) {
      setWord(keyWord);
      getClubList(keyWord);
    }
  }, [keyWord]);

  const getClubList = (w?: string) => {
    const kw = w ? w : word;
    console.log('API 요청', 'keyWord = ' + kw);
  };

  return (
    <Container maxWidth="md">
      <Grid container direction="column">
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
            {/* <span style={{ fontSize: '1rem' }}>내 모임</span> */}
          </IconButton>
          {/* 검색 창 */}
          <SearchBar
            value={word}
            setValue={setWord}
            onSearch={getClubList}
            navi={'.'}
          />
        </Stack>

        {/* 검색 결과 */}
        <Stack direction="column" spacing={2} alignItems="center">
          <p>검색 결과 리스트</p>
          <SearchItem />
          <SearchItem />
        </Stack>
      </Grid>
    </Container>
  );
}
