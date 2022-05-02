import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, Fade } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import SearchBar from '../../../../components/SearchBar';

export default function IndexHeader() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [word, setWord] = useState('');
  // const searchWord = () => {
  //   if (word.length < 2) {
  //     console.log('검색은 2글자 이상');
  //     return;
  //   }
  //   navigate('./search', { state: { propWord: word } });
  // };
  // const onChange = (e: any) => {
  //   setWord(e.target.value);
  // };
  return (
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
        <SearchBar
          fadeDisplay={checked}
          setFadeDisplay={setChecked}
          value={word}
          setValue={setWord}
          navi="./search"
          api="club"
          placeholder="모임 검색"
          close={true}
        />
        {/* <Box
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
          </Box> */}
      </Stack>
    </Stack>
  );
}
