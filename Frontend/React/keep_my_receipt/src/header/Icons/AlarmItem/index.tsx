import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { yellow } from '@mui/material/colors';
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import { Grid } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

interface AlarmType {
  notificationId: number;
  title: string;
  body: string;
  date: string;
  notiCode: string;
  clubId: number;
  requestId: number;
  read: string;
}

interface ResponseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: AlarmType[];
}

export default function AlarmItem() {
  const navigate = useNavigate();
  const [anchorElUser2, setAnchorElUser2] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser2(event.currentTarget);
  };
  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
  };
  function connectNotification(alarm: AlarmType) {
    updateNotification(alarm.notificationId);
    const notiCode = alarm.notiCode;
    if (notiCode === '가입') {
      handleCloseUserMenu2();
      navigate(`/club/${alarm.clubId}/manage`);
    } else if (notiCode === '청구') {
      navigateApprove(alarm.clubId, alarm.requestId);
    } else {
      getAlarms();
    }
  }
  const updateNotification = async (notificationId: number) => {
    await axios
      .put(
        `https://k6d104.p.ssafy.io/api/spring/notification/${notificationId}`,
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteNotification = async (notificationId: number) => {
    await axios
      .delete(
        `https://k6d104.p.ssafy.io/api/spring/notification/${notificationId}`,
      )
      .then((response) => {
        console.log(response);
        getAlarms();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const navigateApprove = async (clubId: number, requestId: number) => {
    axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/request/${requestId}`)
      .then((response) => {
        const data = response.data.data;
        if (data.state === '신청') {
          handleCloseUserMenu2();
          navigate(`/club/${clubId}/receipt/approve`, {
            state: {
              requestId: data.requestId,
              date: data.payDate,
              value: data.price,
              receiptUrl: data.receiptUrl,
            },
          });
        } else {
          alert('이미 처리된 청구입니다');
          getAlarms();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const navigateAlarms = () => {
    navigate('/alert');
  };

  const [alarms, setAlarms] = React.useState([
    {
      notificationId: 0,
      title: 'test',
      body: 'test',
      date: '2022-05-12',
      notiCode: '테스트',
      clubId: 0,
      requestId: 0,
      read: 'false',
    },
  ]);
  const [res, setRes] = React.useState<ResponseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const getAlarms = async (page?: number) => {
    await axios
      .get('https://k6d104.p.ssafy.io/api/spring/notifications', {
        params: {
          page: page ? page : 0,
          size: 5,
          sort: 'id,DESC',
        },
      })
      .then((response) => {
        setRes(response.data.data);
        setAlarms(response.data.data.list);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    getAlarms();
  }, []);

  return (
    <Box>
      <IconButton onClick={handleOpenUserMenu2} sx={{ p: 0, marginLeft: 10 }}>
        <NotificationsIcon
        // sx={{
        //   color: yellow[50],
        // }}
        />
      </IconButton>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser2)}
        onClose={handleCloseUserMenu2}
      >
        {alarms.map((alarm) => (
          <MenuItem
            key={alarm.notificationId.toString()}
            sx={{
              ':hover': {
                backgroundColor: '#FFF5E1',
              },
            }}
            style={{ maxWidth: '90vw' }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography
                textAlign="center"
                style={
                  alarm.read.toString() === 'false'
                    ? { fontWeight: 'bold' }
                    : {}
                }
                onClick={() => connectNotification(alarm)}
              >
                {alarm.date.split('T')[0].substring(5)[0] === '0'
                  ? alarm.date.split('T')[0].substring(6).replace('-', '/')
                  : alarm.date.split('T')[0].substring(5).replace('-', '/')}
              </Typography>
              <Typography
                textAlign="center"
                style={
                  alarm.read.toString() === 'false'
                    ? { fontWeight: 'bold' }
                    : {}
                }
                onClick={() => connectNotification(alarm)}
              >
                {alarm.title}
              </Typography>
              <CancelIcon
                onClick={() => deleteNotification(alarm.notificationId)}
              />
            </Grid>
          </MenuItem>
        ))}
        <Typography fontSize="0.8rem" textAlign="center">
          ...
        </Typography>
        <Typography
          fontSize="0.8rem"
          color="primary"
          textAlign="center"
          onClick={navigateAlarms}
        >
          알림 목록 자세히 보기
        </Typography>
        <hr></hr>
        {alarms.length < 1 ? (
          <Typography textAlign="center">
            &nbsp;&nbsp;알림이 존재하지 않습니다.&nbsp;&nbsp;
          </Typography>
        ) : (
          <Pagination
            pageInfo={res}
            paginationSize={5}
            onClickPage={getAlarms}
            bgColor="#ffaa00"
          />
        )}
      </Menu>
    </Box>
  );
}
