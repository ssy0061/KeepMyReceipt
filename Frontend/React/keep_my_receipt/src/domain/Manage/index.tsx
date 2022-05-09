import React, { useEffect, useState } from 'react';
import { Container, Grid, Tabs, Tab, Box, Stack, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ManageClub from './Club';
import ManageCrew from './Crew';
import ManageJoin from './Join';

interface ClubInfoType {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function ManageIndex() {
  // 모임 정보 가져오기
  const { id } = useParams();
  const [clubInfo, setClubInfo] = useState<ClubInfoType>();
  const getClubInfo = async () => {
    await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setClubInfo(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // tab
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
      </div>
    );
  };
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      //   'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  useEffect(() => {
    getClubInfo();
  }, []);
  return (
    <Container maxWidth="md">
      <Grid container direction="column" sx={{ marginBottom: 3 }}>
        {/* Header */}
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Avatar
            // variant="rounded"
            sx={{
              width: '3rem',
              height: '3rem',
            }}
            src={clubInfo ? clubInfo.image : ''}
          >
            {clubInfo ? (!clubInfo.image ? clubInfo.name[0] : null) : null}
          </Avatar>
          <h2>{clubInfo ? clubInfo.name : '모임관리'}</h2>
        </Stack>

        {/* Tab */}
        <Stack direction="column" alignItems="center" sx={{ marginY: '1rem' }}>
          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              centered
            >
              <Tab
                label="회원"
                {...a11yProps(0)}
                sx={{ fontSize: '1rem', fontWeight: 'bold' }}
              />
              <Tab
                label="가입 대기"
                // {...a11yProps(1)}
                sx={{ fontSize: '1rem', fontWeight: 'bold' }}
              />
              <Tab
                label="모임"
                // {...a11yProps(2)}
                sx={{ fontSize: '1rem', fontWeight: 'bold' }}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ManageCrew />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ManageJoin clubInfo={clubInfo} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ManageClub />
          </TabPanel>
        </Stack>
      </Grid>
    </Container>
  );
}
