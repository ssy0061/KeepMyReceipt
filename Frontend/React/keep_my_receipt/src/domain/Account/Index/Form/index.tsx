import './index.css';
import { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Button,
  ButtonProps,
  Stack,
  TextField,
  Container,
  Input,
  InputAdornment,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { useInput } from '@mui/base';

export default function AuthForm() {
  // 스타일
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[50]),
    '&.MuiButton-contained': {
      color: 'white',
    },
    backgroundColor: yellow[800],
    '&:hover': {
      backgroundColor: yellow[800],
    },
  }));
  const ariaLabel = { 'aria-label': 'description' };

  //회원가입 - 로그인 형식바꾸는 부분
  const [isLogin, setIsLogin] = useState(true);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // 회원가입 API -  useref 훅 이용해 입력 데이터 추출
  const submitHandler = (event: any) => {
    // 형식과 관계없이 확인버튼 눌러서 제출했을 때
    event.preventDefault();

    // 유효성 검사 - useState 사용하기
    // weaglk@naver.com ssafy123!@ 막걸리 : 비밀번호에 특수문자가...음...
    if (isLogin) {
    } else {
      axios
        .post('https://k6d104.p.ssafy.io/api/spring/crew/signup', {
          email: event.target[2].value,
          password: event.target[4].value,
          name: event.target[0].value,
        })
        .then(function (response) {
          //이메일 중복 or 형식에 맞지 않는 경우
          if (response.data.code == 0) {
            console.log(response.data.output);
            console.log(response.data.msg);
          }
          // 회원가입 성공
          else {
            console.log(response.data.output);
            console.log(response.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <Container maxWidth="sm">
      <h1 className="h1">{isLogin ? '로그인' : '회원가입'}</h1>
      <form onSubmit={submitHandler}>
        <Stack spacing={1.5}>
          {!isLogin ? (
            <TextField
              type="text"
              id="nickname"
              name="nickname"
              required
              fullWidth
              label="이름"
              autoComplete="current-password"
              variant="outlined"
              size="small"
            />
          ) : (
            ''
          )}

          <TextField
            placeholder="이메일을 입력해주세요"
            inputProps={ariaLabel}
            id="email"
            name="email"
            required
            fullWidth
            label="이메일"
            type="email"
            autoComplete="current-password"
            variant="outlined"
            size="small"
          />

          <TextField
            id="password"
            name="password"
            required
            fullWidth
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            helperText="특수문자, 영문, 숫자 모두 포함해야 합니다."
            size="small"
          />

          {!isLogin ? (
            <TextField
              type="password"
              id="password-check"
              name="password-check"
              fullWidth
              label="비밀번호 확인"
              autoComplete="current-password"
              variant="outlined"
              size="small"
              required
            />
          ) : (
            ''
          )}

          <Stack>
            <ColorButton variant="contained" type="submit">
              확인
            </ColorButton>
            <Button type="button" onClick={switchAuthModeHandler}>
              {isLogin ? (
                <h5>계정이 없으신가요? 회원가입 하러가기</h5>
              ) : (
                <h5>계정이 있으신가요? 로그인 하러가기</h5>
              )}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
