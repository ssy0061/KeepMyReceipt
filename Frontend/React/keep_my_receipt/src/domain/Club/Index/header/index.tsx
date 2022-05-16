import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, Fade } from '@mui/material';
import { Add, Search, AccessTime } from '@mui/icons-material';
import SearchBar from '../../../../components/SearchBar';
import IndexHeaderDrawer from './Drawer';

export default function IndexHeader() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [word, setWord] = useState('');
  // Drawer
  const [state, setState] = useState(false);
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ position: 'relative', paddingLeft: '2rem' }}
    >
      <h2>내 모임</h2>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ position: 'absolute', right: 0 }}
      >
        <IconButton
          onClick={() => {
            setState(true);
          }}
        >
          <AccessTime sx={{ color: '#000000', fontSize: '2rem' }} />
        </IconButton>
        <IndexHeaderDrawer state={state} setState={setState} />
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
          placeholder="모임 검색"
          close={true}
        />
      </Stack>
    </Stack>
  );
}
