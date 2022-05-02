import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ListItem from '../Listitem';
import sample from './sample.json';
import './index.css';

export default function AlertList() {
  const sampleList = sample;

  return (
    <>
      {sampleList.map((sample: any) => (
        <div className="board">
          <div className="icon">
            <NotificationsActiveIcon />
          </div>
          <div className="text">
            <ListItem items={sample.items} />
          </div>
        </div>
      ))}
    </>
  );
}
