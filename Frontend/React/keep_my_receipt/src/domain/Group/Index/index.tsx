import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Stack, Container, IconButton } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import IndexItem from './item';

interface groupType {
  name: string;
  budget: number;
}

export default function GroupIndex() {
  const [groups, setGroups] = useState<groupType[] | null>([]);
  const getGroups = async () => {
    console.log('가입한 모임 목록 조회 API 요청');
    setGroups([
      { name: '고독한 미식가들', budget: 123000 },
      { name: '축구', budget: 500000 },
    ]);
  };
  useEffect(() => {
    getGroups();
  }, []);
  return (
    <Container maxWidth="md">
      <Grid container direction="column">
        {/* 상단 */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <h2>내 모임</h2>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Link to="../group/create">
              <IconButton color="primary">
                <Add sx={{ fontSize: '2rem' }} />
              </IconButton>
            </Link>
            <Link to="../group/search">
              <IconButton>
                <Search sx={{ color: '#000000', fontSize: '2rem' }} />
              </IconButton>
            </Link>
          </Stack>
        </Stack>

        {/* 리스트 */}
        <Stack direction="column" alignItems="center" spacing={2}>
          {groups?.length ? (
            groups.map((group, index) => (
              <IndexItem key={index} name={group.name} budget={group.budget} />
            ))
          ) : (
            <p>모임 없음</p>
          )}
        </Stack>
      </Grid>
    </Container>
  );
}
