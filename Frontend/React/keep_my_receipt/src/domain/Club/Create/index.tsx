import React, { useEffect, useState } from 'react';
import { IconButton, Stack, Container } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateImage from './image';
import CreateForm from './form';

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
  const onImgChange = (file: any) => {
    setForm({
      ...form,
      imgFile: file,
    });
  };

  const createGroup = async () => {
    if (form.name === '') {
      setCheck(true);
      console.log('모임 이름은 필수');
      return;
    }
    console.log(form);
    await axios
      .post('https://k6d104.p.ssafy.io/api/spring/club', {
        name: name,
        description: intro,
        image:
          'https://cdne-totv8-prod.azureedge.net/media/40307/spurs-blue-compressed.png?anchor=center&mode=crop&quality=100&width=500',
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        console.log('구현 예정: JWT 필요, 이미지 저장 후 URL 가져오기');
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
            onClick={createGroup}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
