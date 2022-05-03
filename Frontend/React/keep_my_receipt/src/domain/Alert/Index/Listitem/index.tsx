import './index.css';
import { Stack, Typography } from '@mui/material';

interface ItemType {
  category: string;
  message: string;
  date: string;
}

export default function ListItem({ items }: { items: ItemType[] }) {
  return (
    <div className="board2">
      {items.map((item) => (
        <Stack key={item.message}>
          <Typography className="text">{item.category}</Typography>
          <Typography className="text">{item.message}</Typography>
          <Typography className="text">{item.date}</Typography>
        </Stack>
      ))}
    </div>
  );
}
