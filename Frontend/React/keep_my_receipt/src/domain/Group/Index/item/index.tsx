import React from 'react';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { CardActions, CardContent, Button, Card, Grid } from '@mui/material';
interface IndexItemProps {
  name: string;
  budget: number;
}
export default function IndexItem({ name, budget }: IndexItemProps) {
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
          <p>{name}</p>
          <p>남은 예산: {budget}</p>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}