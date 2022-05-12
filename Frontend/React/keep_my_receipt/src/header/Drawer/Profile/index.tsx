import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Profile() {
  let userName = '';
  let clubName = '';
  let clubImage = '';
  const onGetName = () => {
    axios
      .get(`/api/spring/crew/info`)
      .then(function (response) {
        userName = response.data.data.name;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const { id } = useParams();
  const onGetClub = () => {
    axios
      .get(`/api/spring/club/${id}`)
      .then(function (response) {
        clubName = response.data.data.name;
        clubImage = response.data.data.image;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  onGetName();
  onGetClub();
  return (
    <>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'orange',
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar src={clubImage} />
          </ListItemAvatar>
          <ListItemText
            primary={`${clubName}`}
            secondary={`안녕하세요! ${userName}님`}
          />
        </ListItem>
      </List>
    </>
  );
}
