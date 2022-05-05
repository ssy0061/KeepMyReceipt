import React from 'react';
import { CardActions, CardContent, Button, Card, Grid } from '@mui/material';
import ClubListItem from '../../../../components/ClubListItem';

export default function IndexList({ clubList }: { clubList: any }) {
  console.log(clubList);
  return (
    <Grid container justifyContent="center">
      {clubList.map((info: any) => (
        <ClubListItem key={info.id} clubInfo={info} />
      ))}
    </Grid>
  );
}
