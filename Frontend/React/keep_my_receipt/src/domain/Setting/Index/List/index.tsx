import { Container } from '@mui/material';
import './index.css';
import AlarmToggle from '../ListItem/AlarmToggle';
import EditUserInfo from '../ListItem/EditUserInfo';
import LeaveApp from '../ListItem/LeaveApp';
import LeaveClub from '../ListItem/LeaveClub';
import Logout from '../ListItem/Logout';
import Notice from '../ListItem/Notice';
import { useParams } from 'react-router-dom';

export default function SettingList() {
  const { id } = useParams();

  return (
    <Container maxWidth="md">
      <Notice />
      <AlarmToggle />
      <EditUserInfo />
      <LeaveApp />
      <LeaveClub />
      <Logout />
    </Container>
  );
}
