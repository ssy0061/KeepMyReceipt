import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';

export default function Profile() {
  const clubName = '축구왕슛돌이';
  const userName = 'OOO';

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'orange',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${clubName}`}
          secondary={`안녕하세요! ${userName}님`}
        />
      </ListItem>
    </List>
  );
}
