import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Box, TextField, Fade } from '@mui/material';
import { Search, Close } from '@mui/icons-material';

SearchBar.defaultProps = {
  fadeDisplay: true,
  value: '',
  close: false,
};

type api = 'club' | 'account' | 'etc';

interface searchBarProps {
  value: string;
  setValue: any;
  fadeDisplay?: boolean;
  setFadeDisplay?: any;
  navi?: string;
  placeholder?: string;
  api: api;
  setApiResult?: any;
  close?: boolean;
}

export default function SearchBar({
  value,
  setValue,
  fadeDisplay,
  setFadeDisplay,
  navi,
  placeholder,
  api,
  setApiResult,
  close,
}: searchBarProps) {
  const navigate = useNavigate();
  const [result, setResult] = useState('');

  const searchWord = () => {
    if (value.length < 2) {
      console.log('검색은 2글자 이상');
      return;
    }
    // 검색 결과 창으로 이동(keyword만 prop하므로 처음에는 직접 api 요청해야 함)
    if (navi) {
      navigate(navi, { state: { propWord: value } });
    }
    //  api 요청
    getList();
  };

  const getList = () => {
    // api 요청
    if (api && setApiResult) {
      // 모임 검색
      if (api === 'club') {
        console.log(
          '모임 검색(searchBar) API 요청' + '(검색어: ' + value + ')',
        );
        setResult(
          "{{'name': '고독한 미식가들', 'budget': '100000'}, {'name': '축구', 'budget': '300000'}}",
        );
        setApiResult(result);
      }
      // ~ 검색
    }
  };

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Fade in={fadeDisplay}>
      <Box
        height="3rem"
        sx={{
          backgroundColor: 'white',
          display: fadeDisplay ? 'block' : 'none',
          paddingLeft: '2rem',
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
            value={value}
            placeholder={placeholder}
            variant="standard"
            sx={{ outlineColor: 'black' }}
          />
          <IconButton onClick={searchWord}>
            <Search sx={{ color: 'black', fontSize: '2rem' }} />
          </IconButton>
          {close ? (
            <IconButton
              onClick={() => {
                setFadeDisplay((prev: boolean) => !prev);
                setValue('');
              }}
            >
              <Close sx={{ color: 'black', fontSize: '2rem' }} />
            </IconButton>
          ) : null}
        </Box>
      </Box>
    </Fade>
  );
}
