import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Button, Grid, Stack, Container } from '@mui/material';
import SettingItem from './Icons/SettingItem';
import NavMenuItem from './NavMenuList';
import AlarmItem from './Icons/AlarmItem';
import ResponsiveDrawer from './Drawer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Content1, NavBarContainer } from './styles';

export default function NavBar() {
  // ver 1. 랜딩페이지 (로그인 안한 경우)
  const { id } = useParams();

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
      <Box height="62px">
        <NavBarContainer>
          <Grid
            container
            sx={{
              direction: 'row',
              float: 'right',
            }}
          >
            {/* [모바일][로그인][클럽선택] 세줄 메뉴 */}

            {isLogin && id ? (
              <Grid item>
                <ResponsiveDrawer />
              </Grid>
            ) : (
              ''
            )}

            {/* [웹][모바일]로고 */}
            <Button
              sx={{ marginLeft: '20vm' }}
              onClick={() => {
                onClickButton(`/`);
              }}
            >
              <img width="200vm" src="/images/randing/logo8.png"></img>
            </Button>

            {isLogin && id ? (
              <Box
                sx={{
                  display: { xs: 'hidden', md: 'none' },
                }}
                style={{ width: '100px' }}
              >
                asdfaeasdfsasdfasdfef
              </Box>
            ) : (
              ''
            )}

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
                <Content1>내 모임</Content1>

                {/* <img width="50vm" src="/images/randing/moim.png"></img> */}
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
                // alignItems="start"
                sx={{
                  direction: 'row',
                  // marginLeft: 'auto',
                  // marginRight: 0,
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
          </Grid>
        </NavBarContainer>
      </Box>
    </>
  );
}
