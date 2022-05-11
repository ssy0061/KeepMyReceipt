import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ItemIndex from './Item';
import axios from 'axios';
import Pagination from '../../../components/Pagination';

interface ItemType {
  requestId: number;
  crewName: string;
  price: number;
  state: string;
}

interface resopnseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: ItemType[];
}

export default function RequestListIndex() {
  const { id } = useParams();
  const matches = useMediaQuery('(min-width:500px)');
  const [res, setRes] = useState<resopnseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const requests = res.list || null;
  const getRequestList = async (page?: number) => {
    await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}/requests`, {
        params: {
          state: 'ALL',
          page: page ? page : 0,
          size: 5,
          sort: 'id,DESC',
        },
      })
      .then((response) => {
        setRes(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [manageable, setManageable] = useState(false);
  const checkManageable = async () => {
    await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}/crew/auth`)
      .then((response) => {
        if (response.data.data === '리더' || response.data.data === '관리자') {
          setManageable(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRequestList(0);
    checkManageable();
  }, []);

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={
          matches
            ? { marginTop: 100, marginBottom: 30, width: '100%' }
            : { marginTop: 70, marginBottom: 100, width: '100%' }
        }
      >
        <Card
          variant="outlined"
          style={{
            padding: 15,
            width: '100%',
            background: '#FFF5E1',
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            style={{ width: '100%' }}
          >
            <Grid
              xs={3}
              sm={3}
              md={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Typography style={{ fontWeight: 'bold' }}>멤버</Typography>
              </CardContent>
            </Grid>
            <Grid
              xs={6}
              sm={6}
              md={6}
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Typography style={{ fontWeight: 'bold' }}>총금액</Typography>
              </CardContent>
            </Grid>
            <Grid
              xs={3}
              sm={3}
              md={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Typography style={{ fontWeight: 'bold' }}>상태</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        {requests.map((request: ItemType) => (
          <ItemIndex
            requestId={request.requestId}
            name={request.crewName}
            price={request.price}
            state={request.state}
            manageable={manageable}
            key={request.requestId.toString()}
          />
        ))}
        <br></br>
        <Pagination
          pageInfo={res}
          paginationSize={5}
          onClickPage={getRequestList}
          bgColor="#ffaa00"
        />
      </Grid>
    </Container>
  );
}
