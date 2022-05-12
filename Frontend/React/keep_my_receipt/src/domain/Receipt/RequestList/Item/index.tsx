import { Card, Grid, CardContent, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

interface ItemType {
  requestId: number;
  name: string;
  price: number;
  state: string;
  manageable: boolean;
}

export default function ItemIndex({
  requestId,
  name,
  price,
  state,
  manageable,
}: ItemType) {
  const navigate = useNavigate();
  const { id } = useParams();
  function connect() {
    if (manageable === false) {
      return;
    } else if (state === '신청') {
      axios
        .get(`https://k6d104.p.ssafy.io/api/spring/club/request/${requestId}`)
        .then((response) => {
          const data = response.data.data;
          navigate(`/club/${id}/receipt/approve`, {
            state: {
              requestId: data.requestId,
              date: data.payDate,
              value: data.price,
              receiptUrl: data.receiptUrl,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  const deleteRequest = async () => {
    axios
      .delete(`https://k6d104.p.ssafy.io/api/spring/club/request/${requestId}`)
      .then((response) => {
        console.log(response);
        navigate(`/club/${id}/receipt/requestList`);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Card
      variant="outlined"
      style={{ padding: 5, width: '100%' }}
      onClick={connect}
      sx={{
        boxShadow: 1,
        ':hover': {
          boxShadow: 6,
          backgroundColor: '#FFF5E1',
        },
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ width: '100%' }}
      >
        <Grid
          xs={3}
          sm={3}
          md={3}
          item
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <Typography>{name}</Typography>
          </CardContent>
        </Grid>
        <Grid
          xs={5}
          sm={5}
          md={5}
          item
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <Typography>
              {price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .concat('원')}
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          xs={3}
          sm={3}
          md={3}
          item
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <Typography>{state}</Typography>
          </CardContent>
        </Grid>
        <Grid
          xs={1}
          sm={1}
          md={1}
          item
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <CancelIcon onClick={deleteRequest} />
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
