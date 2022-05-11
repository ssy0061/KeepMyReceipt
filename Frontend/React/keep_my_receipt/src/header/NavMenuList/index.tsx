import Box from '@mui/material/Box';
import Item from './ListItem';

export default function List() {
  return (
    <div>
      <Box
        sx={{
          float: 'right',
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <Item />
      </Box>
    </div>
  );
}
