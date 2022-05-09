import Box from '@mui/material/Box';
import Item from '../NavMenuListItem';

export default function List() {
  return (
    <div>
      <Box
        sx={{
          bordr: 1,
          float: 'right',
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <Item />
      </Box>
    </div>
  );
}
