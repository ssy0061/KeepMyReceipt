import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack } from '@mui/material';
import axios from 'axios';
import SettingItem from './Icons/SettingItem';
import NavMenuItem from './NavMenuList';
import AlarmItem from './Icons/AlarmItem';
import LogoItem from './LogoItem';
import ResponsiveDrawer from './Drawer';
import { useEffect, useState } from 'react';

export default function NavBar() {
  // ver 1. 랜딩페이지 (로그인 안한 경우)

  // ver 2. 로그인 후 (모임선택 x)
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');

  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = accessToken;
  }
  useEffect(() => {
    setIsLogin(!isLogin);
    console.log('되나??');
  }, [accessToken]);

  return (
    <>
      <header>
        <AppBar
          sx={{
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            position: 'fixed',
            marginTop: '80',
            marginBottm: '80',
          }}
          // marginTop="60"
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
            {isLogin ? <NavMenuItem /> : ''}

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
      </header>
    </>
  );
}
