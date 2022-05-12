import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Stack, Box } from '@mui/material';
import axios from 'axios';
import SettingItem from './Icons/SettingItem';
import NavMenuItem from './NavMenuList';
import AlarmItem from './Icons/AlarmItem';
import LogoItem from './LogoItem';
import ResponsiveDrawer from './Drawer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  // ver 1. 랜딩페이지 (로그인 안한 경우)
  const { id } = useParams() || 0;

  // 권한은 api로 알아오기
  // ver 2. 로그인 후 (모임선택 x)
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');
  const onClickButton = (url: string) => {
    navigate(url);
  };

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = accessToken;
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <Box height="68.5px">
      <AppBar
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          // position: 'fixed',
          margin: '80',
        }}
        style={{ background: '#ffa500' }}
      >
        <Toolbar
          sx={{
            direction: 'row',
            float: 'right',
          }}
        >
          {/* 모바일용 세줄 메뉴 */}
          <ResponsiveDrawer />

          {/* 로고 */}
          <LogoItem />
          {/* 로그인 한 경우, 메뉴 */}
          {isLogin && id ? <NavMenuItem /> : ''}

          {/* 로그인 한 경우, 알림, 설정 아이콘 */}
          {isLogin ? (
            <Stack
              direction="row"
              alignItems="start"
              sx={{
                direction: 'row',
                marginLeft: 'auto',
                marginRight: 0,
              }}
            >
              <AlarmItem />
              <SettingItem />
            </Stack>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
