import React, { useState } from 'react';
import { IconButton, Box, Stack } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface CreateImageProps {
  form: any;
  setForm: any;
}

const Input = styled('input')({
  display: 'none',
});

export default function CreateImage({ form, setForm }: CreateImageProps) {
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
  return (
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
  );
}
