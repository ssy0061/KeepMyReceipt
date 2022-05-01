import React from 'react';
import SearchItem from './item';
import { Container } from '@mui/material';

export default function GroupSearch() {
  return (
    <Container maxWidth="md">
      <h2>모임 검색</h2>
      <SearchItem />
    </Container>
  );
}
