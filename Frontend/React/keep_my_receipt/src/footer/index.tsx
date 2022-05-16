import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PaidIcon from '@mui/icons-material/Paid';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SimpleBottomNavigation() {
  const navigate = useNavigate();
  let userAuth = '';
  const [userAuthNum, setUserAuthNum] = useState(3);
  const { id } = useParams();
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');
  const onClickButton = (url: string) => {
    navigate(url);
  };

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
  useEffect(() => {
    onClick();
  }, []);
  const FooterBox = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.up(420)]: {
      display: 'none',
      height: '56px',
      padding: '10px',
    },
  }));

  return (
    <Box height="56px">
      {/* {isLogin && id ? ( */}
      <footer>
        <FooterBox
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 0,
          }}
        >
          <BottomNavigation
            sx={{
              width: '100%',
            }}
            showLabels
          >
            {/* 영수증 등록 */}
            <BottomNavigationAction
              sx={{
                padding: 0,
                '@media (max-width: 768px)': {
                  minWidth: 'auto',
                  padding: '6px 0',
                },
              }}
              onClick={() => {
                onClickButton(`/club/${id}/receipt/camera`);
              }}
              label={'영수증등록'}
              icon={<PlaylistAddIcon />}
            ></BottomNavigationAction>
            {/* 거래 등록 */}
            {userAuthNum <= 1 ? (
              <BottomNavigationAction
                sx={{
                  padding: 0,
                  '@media (max-width: 768px)': {
                    minWidth: 'auto',
                    padding: '6px 0',
                  },
                }}
                onClick={() => {
                  onClickButton(`/club/${id}/book/create`);
                }}
                label={'거래등록'}
                icon={<PeopleAltIcon />}
              ></BottomNavigationAction>
            ) : (
              ''
            )}

            {/* 영수증 내역 */}
            <BottomNavigationAction
              sx={{
                padding: 0,
                '@media (max-width: 768px)': {
                  minWidth: 'auto',
                  padding: '6px 0',
                },
              }}
              onClick={() => {
                onClickButton(`/club/${id}/receipt/requestList`);
              }}
              label={'영수증내역'}
              icon={<PaidIcon />}
            ></BottomNavigationAction>
            {/* 분석차트 */}
            <BottomNavigationAction
              sx={{
                padding: 0,
                '@media (max-width: 768px)': {
                  minWidth: 'auto',
                  padding: '6px 0',
                },
              }}
              onClick={() => {
                onClickButton(`/club/${id}/analytics/mainChart`);
              }}
              label={'분석차트'}
              icon={<InsertChartIcon />}
            ></BottomNavigationAction>
          </BottomNavigation>
        </FooterBox>
      </footer>
    </Box>
  );
}
