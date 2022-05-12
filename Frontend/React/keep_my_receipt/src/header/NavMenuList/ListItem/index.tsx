import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function ListItem() {
  // ver 3. 모임 선택 후
  const { id } = useParams();
  const [isClub, setISClub] = useState(false);
  if (id) {
    setISClub(true);
  }

  const navigate = useNavigate();
  //하단 후버 메뉴

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

      {/* 3. 분석 */}
      <Button
        onClick={() => {
          onClickButton(`club/${id}/analytics/mainChart`);
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
              // listMenuClick(`club/${id}/receipt/requestList`);
              listMenuClick(`club/1/receipt/requestList`);
            }}
          >
            <Typography textAlign="center">영수증 내역</Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              // listMenuClick(`club/${id}/book`);
              listMenuClick(`club/1/book`);
            }}
          >
            <Typography textAlign="center">거래 내역</Typography>
          </MenuItem>
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
              // addMenuClick(`club/${id}/receipt/camera`);
              addMenuClick(`club/1/receipt/camera`);
            }}
          >
            <Typography textAlign="center">영수증 등록</Typography>
          </MenuItem>

          <MenuItem
            onClick={() => {
              // addMenuClick(` club/${id}/book/createk`);
              addMenuClick(` club/1/book/create`);
            }}
          >
            <Typography textAlign="center">거래 등록</Typography>
          </MenuItem>
        </Menu>
      </Button>

      {/* 0. 내모임 */}
      <Button
        onClick={() => {
          onClickButton(`club/${id}/`);
        }}
        sx={{
          my: 2,
          mr: 1,
          color: 'white',
          display: 'block',
          float: 'right',
        }}
      >
        내 모임
      </Button>
    </div>
  );
}
