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
import { Search, ArrowBackIosNew } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';

type LocationState = { propWord: string };

export default function GroupSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const { propWord } = (location.state as LocationState) || {};
  const [word, setWord] = useState('');
  const [apiResult, setApiResult] = useState('');
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
    if (propWord) {
      console.log(
        'propWord로 모임 검색 API 요청' + '(검색어: ' + propWord + ')',
      );
      setWord(propWord);
    }
  }, []);

  useEffect(() => {
    console.log(apiResult);
  }, [apiResult]);

  return (
    <Container maxWidth="md">
      <Grid container direction="column">
        {/* 상단 */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'relative' }}
        >
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
            color="inherit"
            sx={{ position: 'absolute', left: 0 }}
          >
            <ArrowBackIosNew sx={{ fontSize: '2rem' }} />
          </IconButton>
          <h2>모임 검색</h2>
        </Stack>

        {/* 검색 영역 */}
        <Stack direction="column" spacing={2} alignItems="center">
          {/* 검색 창 */}
          <SearchBar
            value={word}
            setValue={setWord}
            api="club"
            setApiResult={setApiResult}
          />
          {/* <Box
            height="3rem"
            sx={{
              backgroundColor: 'white',
              paddingLeft: '2rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                onChange={onChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchWord(word);
                  }
                }}
                value={word}
                variant="standard"
                sx={{ outlineColor: 'black' }}
              />
              <IconButton onClick={() => searchWord(word)}>
                <Search sx={{ color: 'black', fontSize: '2rem' }} />
              </IconButton>
            </Box>
          </Box> */}
          {/* 검색 결과 */}
          <p>검색 결과 리스트</p>
          <SearchItem />
          <SearchItem />
        </Stack>
      </Grid>
    </Container>
  );
}
