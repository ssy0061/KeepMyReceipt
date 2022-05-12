import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ListItem() {
  const [isLogin, setIsLogin] = useState(false);
  const myAccessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (myAccessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  let userAuth = '';
  const [userAuthNum, setUserAuthNum] = useState(3);
  const [addMenu, setAddMenu] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (addMenu == null) {
      setAddMenu(event.currentTarget);
    } else {
      setAddMenu(null);
    }
  };
  const handleCloseUserMenu = () => {
    setAddMenu(null);
  };
  const addMenuClick = (url: any) => {
    navigate(url);
    setAddMenu(null);
  };
  const [listMenu, setListMenu] = React.useState<null | HTMLElement>(null);

  const handleOpenListMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (listMenu == null) {
      setListMenu(event.currentTarget);
    } else {
      setListMenu(null);
    }
  };

  const handleCloseListMenu = () => {
    setListMenu(null);
  };

  const listMenuClick = (url: any) => {
    navigate(url);
    setListMenu(null);
  };

  const fcmToken = sessionStorage.getItem('fcmToken');

  const onClickButton = (url: string) => {
    navigate(url);
  };

  // 권한별로 navbar 메뉴 다르게 보여주기

  // 현재 유저 권한 조회하기
  const onClick = async () => {
    await axios
      .get(`api/spring/club/${id}/crew/auth`)
      .then((res) => {
        if (res.data) {
          const check = res.data;
          userAuth = check.data;
          if (userAuth === '리더') {
            setUserAuthNum(1);
          } else if (userAuth === '관리자') {
            setUserAuthNum(2);
          } else if (userAuth === '회원') {
            setUserAuthNum(3);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  React.useEffect(() => {
    onClick();
  }, []);

  // 메뉴 > 로그인 로그아웃
  let mystring = '로그인';
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = accessToken;
    mystring = '로그아웃';
  }
  //로그아웃 클릭 시
  const onLogout = () => {
    if (accessToken) {
      axios
        .post('/api/spring/crew/logout', { fcmToken: fcmToken })
        .then(function (response) {
          sessionStorage.removeItem('accessToken');
          navigate('/');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // 로그인 클릭 시
    else {
      navigate('/login');
    }
  };

  return (
    <div>
      {/* 5. 로그인 로그아웃 */}
      <Button
        onClick={onLogout}
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

      {/* 4. 모임관리 */}
      {userAuthNum == 1 ? (
        <Button
          onClick={() => {
            onClickButton(`/club/${id}/manage`);
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
      ) : (
        ''
      )}

      {/* 3. 분석 */}
      <Button
        onClick={() => {
          onClickButton(`/club/${id}/analytics/mainChart`);
        }}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        분석
      </Button>

      {/* 2. 내역 */}
      <Button
        onClick={handleOpenListMenu}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        내역
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={listMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(listMenu)}
          onClose={handleCloseListMenu}
        >
          <MenuItem
            onClick={() => {
              listMenuClick(`/club/${id}/receipt/requestList`);
            }}
          >
            <Typography textAlign="center">영수증 내역</Typography>
          </MenuItem>

          {userAuthNum <= 2 ? (
            <MenuItem
              onClick={() => {
                listMenuClick(`/club/${id}/book`);
              }}
            >
              <Typography textAlign="center">거래 내역</Typography>
            </MenuItem>
          ) : (
            ''
          )}
        </Menu>
      </Button>

      {/* 1. 등록 */}
      <Button
        onClick={handleOpenUserMenu}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        등록
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={addMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(addMenu)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            onClick={() => {
              addMenuClick(`/club/${id}/receipt/camera`);
            }}
          >
            <Typography textAlign="center">영수증 등록</Typography>
          </MenuItem>

          {userAuthNum <= 2 ? (
            <MenuItem
              onClick={() => {
                addMenuClick(`/club/${id}/book/create`);
              }}
            >
              <Typography textAlign="center">거래 등록</Typography>
            </MenuItem>
          ) : (
            ''
          )}
        </Menu>
      </Button>
      {/* 0. 내모임 */}
      {isLogin ? (
        <Button
          onClick={() => {
            onClickButton(`/club`);
          }}
          sx={{
            my: 2,
            mr: 1,
            color: 'white',
            display: 'block',
            float: 'right',
          }}
        >
          {' '}
          내 모임
        </Button>
      ) : (
        ''
      )}
    </div>
  );
}
