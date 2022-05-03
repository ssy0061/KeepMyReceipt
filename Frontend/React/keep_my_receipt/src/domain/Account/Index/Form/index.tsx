import { useState, useRef, useCallback } from 'react';
import './index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Button,
  ButtonProps,
  Stack,
  FormControl,
  Input,
  InputLabel,
  TextField,
  FormHelperText,
  Container,
} from '@mui/material';
import React from 'react';
import { yellow } from '@mui/material/colors';

export default function AuthForm() {
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

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const checkPasswordInputRef = useRef<HTMLInputElement>(null);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = React.useState('Composed TextField');
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    // ref 통해 함수에서 입력 데이터 추출
    const enteredName = nameInputRef.current!.value;
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    const checkEnteredPassword = checkPasswordInputRef.current!.value;

    // // 유효성 검사 - (1)이메일 형식
    // const checkEmailForm = () => {
    //   const reg_email =
    //     /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    //   if (!reg_email.test(enteredEmail)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // };

    // // 유효성 검사 - (2) 이메일 중복확인 url : /api/spring/crew/checkEmail/{email}
    // // 유효성 검사 - (3) 비밀번호 글자 수
    // // 유효성 검사 - (4) 비밀번호 형식 (특수문자+문자+숫자 포함 8자)
    // const checkPasswordForm = () => {
    //   const reg_password =
    //     /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/;
    //   if (!reg_password.test(enteredPassword)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // };

    // // 유효성 검사 - (5) 비밀번호와 비밀번호 확인 일치
    // const checkSamePassword = () => {
    //   if (enteredPassword != checkEnteredPassword) {
    //     console.log('비밀번호가 일치하지 않습니다.');
    //   }
    // };

    //로그인
    if (isLogin) {
    } else {
      fetch('https://k6d104.p.ssafy.io/api/spring/crew/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: checkEnteredPassword,
          name: enteredName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.ok) {
        } else {
          return res.json().then((data) => {
            console.log(data);
          });
        }
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
              fullWidth
              id="name-input"
              label="이름"
              type="text"
              autoComplete="current-password"
              variant="outlined"
              size="small"
              ref={nameInputRef}
            />
          ) : (
            ''
          )}

          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              id="email-input"
              label="이메일"
              type="text"
              autoComplete="current-password"
              variant="outlined"
              size="small"
              ref={emailInputRef}
            />
            {!isLogin ? (
              <Button id="email-doublecheck" variant="outlined">
                확인{' '}
              </Button>
            ) : (
              ''
            )}
          </Stack>

          <TextField
            fullWidth
            id="standard-password-input"
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            helperText="특수문자, 영문, 숫자 모두 포함해야 합니다."
            size="small"
            ref={passwordInputRef}
          />

          {!isLogin ? (
            <TextField
              fullWidth
              id="standard-password-input"
              label="비밀번호 확인"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              size="small"
              required
              ref={checkPasswordInputRef}
            />
          ) : (
            ''
          )}

          <Stack>
            <ColorButton variant="contained">
              {isLogin ? '로그인' : '회원가입'}
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
function setName(value: string) {
  throw new Error('Function not implemented.');
}
