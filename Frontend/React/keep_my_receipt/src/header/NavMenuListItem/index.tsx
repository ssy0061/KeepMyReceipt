import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ListItem() {
  let mystring = '로그인';
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = accessToken;
    mystring = '로그아웃';
  }

  const fcmToken = sessionStorage.getItem('fcmToken');

  const onClickButton = (url: string) => {
    navigate(url);
  };

  const onLogin = (url: string) => {
    if (accessToken) {
      axios
        .post('/api/spring/crew/logout', { fcmToken: fcmToken })
        .then(function (response) {
          if (response.data.output == 0) {
            console.log('로그아웃 실패');
            console.log(response);
            console.log(accessToken);
            console.log(fcmToken);
          } else {
            console.log('로그아웃 성공');
            navigate('/');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      navigate(url);
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          onLogin('/login');
        }}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        {mystring}
      </Button>

      <Button
        onClick={() => {
          onClickButton(`/club/${1}/book`);
        }}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        장부내역
      </Button>
      <Button
        onClick={() => {
          onClickButton('/book');
        }}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        분석차트
      </Button>
      <Button
        onClick={() => {
          onClickButton('/');
        }}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        거래등록
      </Button>
      <Button
        onClick={() => {
          onClickButton(`/club/${1}/manage`);
        }}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        모임관리
      </Button>
      <Button
        onClick={() => {
          onClickButton('/');
        }}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        보고서
      </Button>
    </div>
  );
}
