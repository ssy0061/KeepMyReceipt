import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  useMediaQuery,
  Grid,
  Card,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Stack,
} from '@mui/material';
import LargeTagChart from './LargeTagChart';
import FlowChart from './FlowChart';
import axios from 'axios';
import sample1 from './sample1.json';

export default function MainChartIndex() {
  const { params } = useParams();
  const matches = useMediaQuery('(min-width:500px)');

  const date = new Date();
  const year = String(date.getFullYear());
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const curStart = year.concat('-').concat(month).concat('-').concat('01');
  const curEnd = year.concat('-').concat(month).concat('-').concat(day);
  const [startDate, setStartDate] = useState(curStart);
  const [endDate, setEndDate] = useState(curEnd);
  const [sumValue, setSumValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    loadData();
    setOpen(false);
  };
  function changeStartDate(e: any) {
    const newStartDate = e.target.value;
    if (newStartDate >= endDate) {
      alert('시작일은 종료일보다 빨라야 합니다');
      e.target.value = startDate;
      return;
    }
    setStartDate(e.target.value);
  }
  function changeEndDate(e: any) {
    const newEndDate = e.target.value;
    if (startDate >= newEndDate) {
      alert('종료일은 시작일보다 늦어야 합니다');
      e.target.value = endDate;
      return;
    }
    setEndDate(e.target.value);
  }
  const [list, setList] = useState([{ id: '0', value: '0', rate: '0' }]);
  function loadData() {
    console.log('load Data from DB');
    setList(sample1);
    let tmpSumValue = 0;
    sample1.forEach((item) => {
      tmpSumValue += parseInt(item.value);
    });
    setSumValue(tmpSumValue);
    // const getClubList = async () => {
    //   await axios
    //     .get('https://k6d104.p.ssafy.io/api/spring/clubs/joined', {
    //       params: {
    //         page: page ? page : 0,
    //         size: 5,
    //         sort: 'id,DESC',
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // };
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container maxWidth="md">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: 10 }}
          >
            <Grid xs={5.8} sm={5.8} md={5.8}>
              <TextField
                id="startDate"
                label="시작일"
                type="date"
                defaultValue={startDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={changeStartDate}
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={5.8} sm={5.8} md={5.8}>
              <TextField
                id="endDate"
                label="종료일"
                type="date"
                defaultValue={endDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={changeEndDate}
                style={{ width: '100%' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={
          matches
            ? { marginTop: 100, marginBottom: 30, width: '100%' }
            : { marginTop: 70, marginBottom: 100, width: '100%' }
        }
      >
        <Stack spacing={2} style={{ width: '100%' }}>
          <Card
            variant="outlined"
            style={{
              padding: 15,
              width: '100%',
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              style={{ width: '100%' }}
            >
              <Grid xs={8} sm={8} md={8} container justifyContent="start">
                <Typography
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  {startDate}　~　{endDate}
                </Typography>
              </Grid>
              <Grid xs={4} sm={4} md={4} container justifyContent="end">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ fontWeight: 'bold' }}
                  onClick={handleOpen}
                >
                  기간설정
                </Button>
              </Grid>
            </Grid>
          </Card>
          <LargeTagChart
            sumValue={sumValue}
            items={list}
            startDate={startDate}
            endDate={endDate}
          />
          <FlowChart />
        </Stack>
      </Grid>
    </Container>
  );
}
