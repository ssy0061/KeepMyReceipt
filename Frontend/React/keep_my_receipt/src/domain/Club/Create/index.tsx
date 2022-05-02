import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Box,
  Button,
  Stack,
  Grid,
  TextField,
  Container,
} from '@mui/material';
import { AddPhotoAlternate, ArrowBackIosNew, Check } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

interface formProps {
  name: any;
  intro?: any;
  imgFile?: any;
}

export default function GroupCreate() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  // form
  const [form, setForm] = useState<formProps>({
    name: '',
    intro: '',
    imgFile: '',
  });
  const { name, intro, imgFile } = form;
  const onFormChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const createGroup = async () => {
    if (form.name === '') {
      setCheck(true);
      console.log('모임 이름은 필수');
      return;
    } else {
      setCheck(false);
    }
    console.log(form);
    console.log('모임 생성 API 요청');
    // 초기화
    // setForm({
    //   name: '',
    //   intro: '',
    //   imgFile: '',
    // });

    // 내 모임으로 이동
    navigate('..');
  };

  // 이미지
  const [imgSrc, setImgSrc] = useState('');
  const readImage = (input: any) => {
    // 이미지 파일인지 검사(생략)

    // FileReader 인스턴스 생성
    const reader = new FileReader();

    // 이미지가 업로드된 경우
    reader.onload = (e: any) => {
      setImgSrc(e.target.result);
    };

    // reader가 이미지 읽기
    reader.readAsDataURL(input.files[0]);
  };
  const onChange = (event: any) => {
    setForm({
      ...form,
      imgFile: event.target.files[0],
    });
    readImage(event.target);
  };
  // // src 확인용
  // useEffect(() => {
  //   console.log(imgSrc);
  // }, [imgSrc]);
  return (
    <Container maxWidth="md">
      <Stack direction="column" spacing={4}>
        {/* 상단 */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'relative' }}
        >
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
            color="inherit"
            sx={{ position: 'absolute', left: 0 }}
          >
            <ArrowBackIosNew sx={{ fontSize: '2rem' }} />
          </IconButton>
          <h2>모임 만들기</h2>
        </Stack>

        {/* 본문 */}
        {/* 이미지 */}
        <Stack spacing={3}>
          <Grid container direction="column">
            <Stack alignItems="center">
              <Box
                component="span"
                sx={{
                  width: 200,
                  height: 200,
                  backgroundColor: '#DDDDDD',
                  borderRadius: 10,
                  boxShadow: 1,
                  backgroundImage: imgSrc ? `url(${imgSrc})` : 'url()',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  position: 'relative',
                }}
              >
                <Box sx={{ position: 'absolute', right: 0, bottom: 0 }}>
                  <label htmlFor="icon-btn-file">
                    <Input
                      onChange={onChange}
                      accept="image/*"
                      id="icon-btn-file"
                      type="file"
                    />
                    <IconButton
                      color="inherit"
                      aria-label="upload pictrue"
                      component="span"
                      sx={{
                        borderRadius: 30,
                        backgroundColor: 'white',
                        boxShadow: 3,
                        ':hover': { backgroundColor: 'white', boxShadow: 6 },
                      }}
                    >
                      <AddPhotoAlternate
                        sx={{
                          fontSize: '2rem',
                        }}
                      />
                    </IconButton>
                  </label>
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* Form */}
          <Stack justifyContent="center">
            <Container maxWidth="sm">
              <Grid container rowSpacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    error={check && !name ? true : false}
                    helperText={
                      check && !name ? '모임 이름은 필수입니다' : null
                    }
                    fullWidth
                    required
                    label="모임 이름"
                    name="name"
                    value={name}
                    onChange={onFormChange}
                    inputProps={{ maxLength: 20 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="모임 소개"
                    multiline
                    name="intro"
                    value={intro}
                    onChange={onFormChange}
                    inputProps={{ maxLength: 50 }}
                    maxRows={4}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 1 }}>
                  <Button
                    onClick={createGroup}
                    variant="contained"
                    fullWidth
                    sx={{ marginBottom: 3 }}
                  >
                    완료
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
