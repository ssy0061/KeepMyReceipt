import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardActions, CardContent, Button, Card, Grid } from '@mui/material';
import ClubListItem from '../../../../components/ClubListItem';

export default function IndexList({ clubList }: { clubList: any }) {
  const navigate = useNavigate();
  // console.log(clubList);
  const onClick = (id: number) => {
    navigate(`./${id}/book`);
    window.scrollTo(0, 0);
  };
  return (
    <Grid container justifyContent="center">
      {clubList.map((info: any) => (
        <ClubListItem
          onClick={() => {
            onClick(info.id);
          }}
          key={info.id}
          clubInfo={info}
        />
      ))}
    </Grid>
  );
}
