import { Box, Divider, Stack, Typography, Container } from '@mui/material';
import { useEffect } from 'react';
import toCurrency from '../../../../services/toCurrency';
import ListItem from '../ListItem';
import sample from './sample.json';

export default function BookList({ list }: { list: any }) {
  return (
    <>
      {list.map((item: any) => (
        <Box marginY={1} paddingX="1rem">
          <Stack
            key={item.transactionDetailId}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={1}
            paddingX={0.5}
          >
            <Stack spacing={0.5} paddingTop={0.5}>
              <Typography variant="body2">{item.date}</Typography>
              <Typography>{item.name}</Typography>
            </Stack>
            <Typography>{item.price}</Typography>
          </Stack>
          <Divider />
        </Box>
      ))}
    </>
  );
}
