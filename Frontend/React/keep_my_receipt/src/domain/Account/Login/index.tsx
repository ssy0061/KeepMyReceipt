import './index.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Button,
  ButtonProps,
  Stack,
  TextField,
  Container,
} from '@mui/material';
import { yellow } from '@mui/material/colors';

//FCM SDK 추가 및 초기화
import firebase from 'firebase/compat/app';

// 메시지 전송
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

export default function LoginForm() {
  //FCM SDK 추가 및 초기화
  const config = {
    apiKey: 'AIzaSyDGykCVGG6PGRdGT8-Y5H7aQAIcr_27Tqs',
    authDomain: 'keep-my-receipt.firebaseapp.com',
    projectId: 'keep-my-receipt',
    storageBucket: 'keep-my-receipt.appspot.com',
    messagingSenderId: '891638757148',
    appId: '1:891638757148:web:1c9d4f1ca58fb5b48eecd9',
    measurementId: 'G-HMSK59MMM0',
  };

  let token = '';
  // 허가요청
  firebase.initializeApp(config);
  // 등록 토큰 액세스
  const messaging = getMessaging();

  // 웹 앱이 포그라운드 상태일 때 메시지 처리
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
  });

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
  const navigate = useNavigate();
  const switchAuthModeHandler = () => {
    navigate('/signup');
  };

  // input value 가져오기
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 대기중 버튼
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  // let token = sessionStorage.getItem('fcmToken');

  //일반 로그인
  function onLoginSuccess(response: any) {
    const { accessToken } = response.data;

    // header accessToken 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
  }

  //로그인 유지
  function onSilentRefresh(response: any) {
    axios
      .post('/silent-refresh', response)
      .then(onLoginSuccess)
      .catch((error) => {
        console.log('로그인 유지 실패');
      });
  }

  getToken(messaging, {
    // FCM에서 웹 사용자 인증 정보 구성
    vapidKey:
      'BAOlbrGYtLAHLlKXzaoFFTaZIujMmBrXtngCRvt13MHAv-CqMwy9y-D2-yVPMN0udgkZ_uvjJtchfr-oBpqqrnM',
  })
    .then((currentToken) => {
      if (currentToken) {
        token = currentToken;
        sessionStorage.setItem('fcmToken', token);
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });

  const submitHandler = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    // 모바일에서 로그인 > native app에게 달라고 요청하기
    if (window['Android']) {
      const mobileToken = window['Android']['requestToken']();
      token = mobileToken;
    }

    axios
      .post('/api/spring/crew/login', {
        email: email,
        password: password,
        fcmToken: token,
      })
      .then(function (response) {
        setIsLoading(false);

        if (response.data.output == 0) {
          console.log('로그인 실패');
          console.log(response.data);
        } else {
          onLoginSuccess(response.data);
          navigate('/club');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <h1 className="h1">로그인</h1>
      <form onSubmit={submitHandler}>
        <Stack spacing={1.5}>
          <TextField
            onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요"
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
            onChange={onChangePassword}
            id="password"
            name="password"
            required
            fullWidth
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            size="small"
          />
          <Stack>
            {!isLoading && (
              <ColorButton variant="contained" type="submit">
                확인
              </ColorButton>
            )}
            {isLoading && <Button variant="contained">로딩중...</Button>}
            <Button type="button" onClick={switchAuthModeHandler}>
              <h5>계정이 없으신가요? 회원가입 하러가기</h5>
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
