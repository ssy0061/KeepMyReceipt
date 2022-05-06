import React from 'react';
import { Grid } from '@mui/material';
import ClubListItem from '../../../../components/ClubListItem';

export default function SearchList({ clubList }: { clubList: any }) {
  const onClick = (id: number) => {
    console.log(id + '번 club' + '가입 신청 ///// 구현 예정');
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
