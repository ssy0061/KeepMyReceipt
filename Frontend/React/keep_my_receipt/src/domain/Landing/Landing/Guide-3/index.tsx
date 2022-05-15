import { Box, Container, Grid } from '@mui/material';
import { Title, Description } from '../Guide-1/styles';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import 'animate.css/animate.min.css';
function LandingSecond() {
  return (
    // container 화면 중앙에 위치 시킬 때, fixed는 항상 동일한 너비 제공!
    // grid 컨텐츠를 반응형 격자로 배치시킬 때 유용. 기본적으로 12열 격자(grid), 각 breakpoint별로 각 셀이 몇 열을 차지할 것인지 명시
    // 하나의 grid container 안에 여러 grid item 배치시키면 된다.

    <Container
      sx={{
        width: '100%',
        marginY: '20%',
      }}
      fixed
      maxWidth="lg"
    >
      <Grid
        container
        sx={{
          width: '100%',
        }}
        spacing={2}
      >
        {/* 설명 */}
        <Grid item xs={12} sm={6}>
          <AnimationOnScroll animateIn="animate__fadeIn">
            <Box
              sx={{
                marginBottom: '60px',
              }}
            >
              <Title>보고서와 차트</Title>
              <Description>보고서에는 어쩌구 저쩌구</Description>
              <Description>차트에는 어쩌구 저쩌구</Description>
            </Box>
          </AnimationOnScroll>
        </Grid>

        {/* 휴대폰 사진 */}
        <Grid item xs={12} sm={6}>
          <AnimationOnScroll animateIn="animate__fadeIn animate__slower">
            <Box textAlign="center" width={'100%'}>
              <img
                src="/images/randing/iphone.png"
                width="70%"
                height="40%"
              ></img>
            </Box>
          </AnimationOnScroll>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LandingSecond;
