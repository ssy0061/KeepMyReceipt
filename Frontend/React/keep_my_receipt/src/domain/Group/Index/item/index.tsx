import React from 'react';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { CardActions, CardContent, Button, Card, Grid } from '@mui/material';
export default function IndexItem({
  name,
  budget,
}: {
  name: string;
  budget: number;
}) {
  return (
    <Grid item xs={12}>
      <Card
        variant="outlined"
        sx={{
          width: 300,
          ':hover': {
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          <LocalDiningIcon fontSize="large" />
          <div>{name}</div>
          <div>남은 예산: {budget}</div>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
