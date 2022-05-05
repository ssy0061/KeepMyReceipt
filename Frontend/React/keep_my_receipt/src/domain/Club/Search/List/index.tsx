import React from 'react';
import { Grid } from '@mui/material';
import ClubListItem from '../../../../components/ClubListItem';

export default function SearchList({ clubList }: { clubList: any }) {
  return (
    <Grid container justifyContent="center">
      {clubList.map((info: any) => (
        <ClubListItem key={info.id} clubInfo={info} />
      ))}
    </Grid>
  );
}
