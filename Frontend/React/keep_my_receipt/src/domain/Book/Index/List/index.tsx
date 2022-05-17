import { Box, Divider, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import toCurrency from '../../../../services/toCurrency';
import ListItem from '../ListItem';
import sample from './sample.json';

export default function BookList({ list }: { list: any }) {
  return (
    <>
      {list.map((item: any) => (
        <Box marginY={1}>
          <Stack
            key={item.transactionDetailId}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={1}
            paddingX={1}
          >
            <Stack spacing={1}>
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
