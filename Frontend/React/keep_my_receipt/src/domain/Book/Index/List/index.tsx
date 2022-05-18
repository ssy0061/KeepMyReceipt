import {
  Box,
  Divider,
  Stack,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toCurrency from '../../../../services/toCurrency';
import ListItem from '../ListItem';

interface BookListProps {
  result: any;
  historyList: any;
  getHistory: any;
  checkAdd: boolean;
}

export default function BookList({
  result,
  historyList,
  getHistory,
  checkAdd,
}: BookListProps) {
  const { pageNumber, totalPages } = result;

  const navigate = useNavigate();
  const onClick = (item: any) => {
    navigate(`./detail`, {
      state: {
        transactionId: item.transactionId,
        transactionDetailId: item.transactionDetailId,
      },
    });
  };
  const onClickToAdd = async (page?: number) => {
    // console.log(page);
    getHistory(page);
  };

  return (
    <>
      {historyList.map((item: any) => (
        <Box
          key={item.transactionDetailId}
          marginY={1}
          paddingX="1rem"
          onClick={() => onClick(item)}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={1}
            paddingX={0.5}
            sx={{
              '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
            }}
          >
            <Stack spacing={0.5} paddingTop={0.5}>
              <Typography variant="body2">{item.date}</Typography>
              <Typography>{item.name}</Typography>
            </Stack>
            <Typography>{toCurrency(item.price)}</Typography>
          </Stack>
          <Divider />
        </Box>
      ))}
      {checkAdd && historyList.length > 0 ? (
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ paddingX: '1rem', marginTop: '1rem' }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => onClickToAdd(pageNumber + 1)}
            sx={{
              color: 'black',
              boxShadow: 1,
              backgroundColor: '#eeeeee',
              '&:hover': {
                backgroundColor: '#bdbdbd',
              },
            }}
          >
            더보기
          </Button>
        </Stack>
      ) : null}
    </>
  );
}
