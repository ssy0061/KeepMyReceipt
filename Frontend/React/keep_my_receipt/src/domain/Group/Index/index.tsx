import React from 'react';
import { Button, Grid } from '@mui/material';
import IndexItem from './item';

export default function GroupIndex() {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12} container justifyContent="center">
        <h2>내 모임</h2>
      </Grid>

      <IndexItem name="고독한 미식가들" budget={123000} />
      <IndexItem name="축구" budget={500000} />
      <h1>모임을 찾으려면 +???</h1>
      <Button variant="contained">새로운 모임 만들기</Button>
    </Grid>
  );
}
