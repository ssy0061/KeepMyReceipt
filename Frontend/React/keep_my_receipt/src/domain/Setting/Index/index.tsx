import { Container, Modal } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import List from './List';

export default function SettingIndex() {
  return (
    <Container maxWidth="md">
      <List></List>
    </Container>
  );
}
