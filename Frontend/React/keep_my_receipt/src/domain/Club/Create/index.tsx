import React, { useEffect, useState } from 'react';
import { IconButton, Stack, Container } from '@mui/material';
import { ArrowBackIosNew, ContactlessOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateImage from './image';
import CreateForm from './form';

interface formProps {
  name: any;
  intro?: any;
}

export default function GroupCreate() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  // form
  const [imgFile, setImgFile] = useState();
  const [form, setForm] = useState<formProps>({
    name: '',
    intro: '',
  });
  const { name, intro } = form;
  const onFormChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onImgChange = (file: any) => {
    setImgFile(file);
  };

  const onClick = async () => {
    if (form.name === '') {
      setCheck(true);
      console.log('모임 이름은 필수');
      return;
    }
    // 이미지 파일 업로드하여 url 가져오기
    const imgUrl = imgFile
      ? await axios
          .post(
            '/fast/uploadImage',
            { image: imgFile },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .catch((e) => {
            console.log(e);
          })
      : '';
    // 모임 생성
    await axios
      .post('https://k6d104.p.ssafy.io/api/spring/club', {
        name: name,
        description: intro,
        image: imgUrl ? imgUrl.data : '',
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    // 내 모임으로 이동
    navigate('..');
  };
  return (
    <Container maxWidth="md">
      <Stack direction="column" spacing={3}>
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
        <Stack spacing={3}>
          {/* 이미지 */}
          <CreateImage onImgChange={onImgChange} />

          {/* Form */}
          <CreateForm
            name={name}
            intro={intro}
            check={check}
            onChange={onFormChange}
            onClick={onClick}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
