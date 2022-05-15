import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Button, Stack } from '@mui/material';
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
  const { id } = useParams();
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
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      <header>
        <Box
          height="68.5px"
          // height="100.5px"
        >
          <AppBar
            elevation={0}
            sx={{
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              margin: '80',
            }}
            style={{ background: '#ffffff' }}
          >
            <Toolbar
              sx={{
                direction: 'row',
                float: 'right',
              }}
            >
              <Box
                sx={{
                  marginRight: '200px',
                }}
              ></Box>
              {/* 모바일용 세줄 메뉴 */}
              {isLogin && id ? <ResponsiveDrawer /> : ''}

              {/* 로고 */}
              <LogoItem />
              {/* 0. 내모임 */}
              {isLogin && !id ? (
                <Button
                  onClick={() => {
                    onClickButton(`/club`);
                  }}
                  sx={{
                    my: 2,
                    mr: 1,
                    color: 'black',
                    display: 'block',
                    float: 'right',
                  }}
                >
                  내 모임
                </Button>
              ) : (
                ''
              )}

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
              <Box
                sx={{
                  marginLeft: '200px',
                }}
              ></Box>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
    </>
  );
}
