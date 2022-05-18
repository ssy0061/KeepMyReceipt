import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ItemType {
  id: String;
  value: String;
  rate: String;
}

export default function ItemIndex({ item }: { item: ItemType }) {
  const navigate = useNavigate();
  function goSubChart() {
    // Todo : club id prop에서 빼오기... 날짜랑 클럽이름이랑 1차태그까지 파라미터로!
    navigate('/club/1/analytics/subChart', {
      state: { id: item.id, sumValue: item.value },
    });
  }
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        variant="outlined"
        style={{
          padding: 15,
          width: '100%',
        }}
        sx={{
          boxShadow: 1,
          ':hover': {
            boxShadow: 6,
            backgroundColor: '#FFF5E1',
          },
        }}
        onClick={goSubChart}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* 태그 이름과 퍼센트 */}
          <Grid xs={7} sm={7} md={7} container direction="row">
            <Typography style={{ fontWeight: 'bold' }}>{item.id}</Typography>
            &nbsp;&nbsp;
            <Typography style={{ color: 'gray' }}>{item.rate}%</Typography>
          </Grid>

          {/* 금액 */}
          <Grid xs={4} sm={4} md={4} container justifyContent="end">
            <Typography>
              {item.value
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .concat('원')}
            </Typography>
          </Grid>

          {/* > 모양 아이콘 */}
          <Grid xs={1} sm={1} md={1} container justifyContent="center">
            <Typography style={{ fontWeight: 'bold', color: 'blue' }}>
              &gt;
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
