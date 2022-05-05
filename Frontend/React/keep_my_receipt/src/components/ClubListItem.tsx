import React from 'react';
import {
  CardActions,
  CardActionArea,
  CardContent,
  Button,
  Card,
  Stack,
  Avatar,
  Typography,
  Grid,
} from '@mui/material';

interface ClubInfoType {
  id: number;
  name: string;
  description: string;
  image: string;
}

export default function ClubListItem({ clubInfo }: { clubInfo: ClubInfoType }) {
  const { id, name, description, image } = clubInfo;
  return (
    <Grid
      item
      xs={12}
      container
      justifyContent="center"
      sx={{ margin: '0.5rem' }}
    >
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          boxShadow: 1,
          ':hover': {
            boxShadow: 6,
            // backgroundColor: '#FFF5E1',
          },
        }}
      >
        <CardActionArea>
          <CardContent sx={{ padding: '1rem' }}>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Avatar
                // variant="rounded"
                sx={{
                  width: '5rem',
                  height: '5rem',
                }}
                src={image ? image : ''}
              >
                {!image ? name[0] : null}
              </Avatar>

              <Stack direction="column" spacing={1}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2">{description}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
