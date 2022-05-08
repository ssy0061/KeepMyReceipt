import React, { useState } from 'react';
import { Container, Grid, Tabs, Tab, Box, Stack } from '@mui/material';

import ManageClub from './Club';
import ManageCrew from './Crew';
import ManageJoin from './Join';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function ManageIndex() {
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
  return (
    <Container maxWidth="md">
      <Grid container direction="column" sx={{ marginBottom: 3 }}>
        {/* Header */}
        <h2>모임 관리</h2>
        {/* Tab */}
        <Stack direction="column" alignItems="center">
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
            <ManageJoin />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ManageClub />
          </TabPanel>
        </Stack>
      </Grid>
    </Container>
  );
}
