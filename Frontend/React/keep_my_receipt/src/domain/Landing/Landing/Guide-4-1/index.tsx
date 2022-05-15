import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Title, Description, Point } from '../Guide-1/styles';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import 'animate.css/animate.min.css';

export default function GuideSecond() {
  return (
    <div
      style={{
        paddingTop: '1vw',
        paddingBottom: '1vw',
        background: '#efefef',
        objectFit: 'cover',
      }}
    >
      <Container
        sx={{
          width: '100%',
          marginY: '10vw',
        }}
        fixed
        maxWidth="lg"
      >
        <Grid
          container
          sx={{
            width: '100%',
          }}
          // spacing={2}
        >
          <Grid item xs={12} sm={6} padding={3}>
            <AnimationOnScroll animateIn="animate__fadeIn animate__slower">
              <Box
                sx={{
                  marginBottom: '60px',
                }}
              >
                <Point>포인트 글자</Point>
                <Title>영수증 등록</Title>
                <Description>보고서에는 어쩌구 저쩌구</Description>
                <Description>
                  {' '}
                  어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구 어쩌구
                  저쩌구
                </Description>
              </Box>
            </AnimationOnScroll>
          </Grid>

          {/* 휴대폰 사진 */}
          <Grid item xs={12} sm={6}>
            <AnimationOnScroll animateIn="animate__fadeIn animate__slower">
              <Card
                sx={{
                  marginLeft: '2vw',
                  marginRight: '2vw',
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="200"
                  image="/images/randing/meeting.png"
                />
                <CardContent sx={{ height: '200px' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </Card>
            </AnimationOnScroll>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
