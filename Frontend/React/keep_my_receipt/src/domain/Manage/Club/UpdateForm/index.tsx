import React, { useState } from 'react';
import { Button, Stack, Grid, TextField, Container } from '@mui/material';
import UpdateFormImage from './Image';
import ClubDeleteDialog from '../DeleteDialog';

interface ClubUpdateFormProps {
  clubInfo: any;
  formName: string;
  formDes?: string;
  formImage?: string;
  check: boolean;
  onChange: any;
  onClick: any;
  onImgChange: any;
}

export default function ClubUpdateForm({
  clubInfo,
  formName,
  formDes,
  formImage,
  check,
  onChange,
  onClick,
  onImgChange,
}: ClubUpdateFormProps) {
  const [open, setOpen] = useState(false);
  return (
    <Stack spacing={3}>
      {/* Dialog */}
      <ClubDeleteDialog open={open} setOpen={setOpen} clubInfo={clubInfo} />
      {/* 이미지 */}
      <UpdateFormImage onImgChange={onImgChange} formImage={formImage} />
      {/* 텍스트 */}
      <Stack justifyContent="center">
        <Container maxWidth="sm">
          <Grid container rowSpacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                error={check && !formName ? true : false}
                helperText={
                  check && !formName ? '모임 이름은 필수입니다' : null
                }
                fullWidth
                required
                label="모임 이름"
                name="formName"
                value={formName}
                onChange={onChange}
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="모임 소개"
                name="formDes"
                value={formDes}
                onChange={onChange}
                inputProps={{ maxLength: 50 }}
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 1 }}>
              <Button
                onClick={onClick}
                variant="contained"
                fullWidth
                sx={{ marginBottom: 3 }}
              >
                저장
              </Button>
            </Grid>
            <Button
              onClick={() => {
                setOpen(true);
              }}
              color="warning"
              variant="outlined"
              fullWidth
              sx={{ marginY: 3 }}
            >
              모임 폐쇄
            </Button>
          </Grid>
        </Container>
      </Stack>
    </Stack>
  );
}
