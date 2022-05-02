import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Stack,
  Container,
  IconButton,
  Box,
  Fade,
  TextField,
} from '@mui/material';
import { Add, Search, Close } from '@mui/icons-material';
import IndexItem from './item';

interface groupType {
  name: string;
  budget: number;
}

export default function GroupIndex() {
  const navigate = useNavigate();

  // 모임 검색
  const [checked, setChecked] = useState(false);
  const [word, setWord] = useState('');
  const searchWord = () => {
    if (word.length < 2) {
      console.log('검색은 2글자 이상');
      return;
    }
    navigate('./search', { state: { propWord: word } });
  };
  const onChange = (e: any) => {
    setWord(e.target.value);
  };

  // 모임 목록 조회
  const [groups, setGroups] = useState<groupType[] | null>([]);
  const getGroups = async () => {
    console.log('가입한 모임 목록 조회 API 요청');
    setGroups([
      { name: '고독한 미식가들', budget: 123000 },
      { name: '축구', budget: 500000 },
      { name: '야구', budget: 1000000 },
      { name: '고독한 미식가들', budget: 123000 },
      { name: '축구', budget: 500000 },
      { name: '야구', budget: 1000000 },
      { name: '고독한 미식가들', budget: 123000 },
      { name: '축구', budget: 500000 },
      { name: '야구', budget: 1000000 },
    ]);
  };
  useEffect(() => {
    getGroups();
  }, []);
  return (
    <Container maxWidth="md">
      <Grid container direction="column">
        {/* 상단 */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'relative' }}
        >
          <h2>내 모임</h2>
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ position: 'absolute', right: 0 }}
          >
            <IconButton
              color="primary"
              onClick={() => {
                navigate('./create');
              }}
            >
              <Add sx={{ fontSize: '2rem' }} />
            </IconButton>
            <IconButton
              onClick={() => {
                // navigate('./search');
                setChecked((prev) => !prev);
              }}
            >
              <Search sx={{ color: '#000000', fontSize: '2rem' }} />
            </IconButton>
          </Stack>

          {/* 검색창 */}
          <Stack sx={{ position: 'absolute', right: 0, top: '0.8rem' }}>
            <Fade in={checked}>
              <Box
                height="3rem"
                sx={{
                  backgroundColor: 'white',
                  display: checked ? 'block' : 'none',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    onChange={onChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        searchWord();
                      }
                    }}
                    value={word}
                    placeholder="모임 검색"
                    variant="standard"
                    sx={{ outlineColor: 'black' }}
                  />
                  <IconButton onClick={searchWord}>
                    <Search sx={{ color: 'black', fontSize: '2rem' }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setChecked((prev) => !prev);
                      setWord('');
                    }}
                  >
                    <Close sx={{ color: 'black', fontSize: '2rem' }} />
                  </IconButton>
                </Box>
              </Box>
            </Fade>
          </Stack>
        </Stack>

        {/* 리스트 */}
        <Grid container justifyContent="center" spacing={2}>
          {groups?.length ? (
            groups.map((group, index) => (
              <IndexItem key={index} name={group.name} budget={group.budget} />
            ))
          ) : (
            <p>모임 없음</p>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
