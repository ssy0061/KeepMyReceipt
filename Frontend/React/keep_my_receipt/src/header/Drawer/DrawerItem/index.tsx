import { useNavigate } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Divider from '@mui/material/Divider';
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function NestedList() {
  const [addOpen, setAddOpen] = React.useState(false);
  const [listOpen, setListOpen] = React.useState(false);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const addHandleClick = () => {
    setAddOpen(!addOpen);
  };

  const listHandleClick = () => {
    setListOpen(!listOpen);
  };

  const receipt = () => {
    navigate(`/club/${1}/receipt/camera`);
    setMobileOpen(!mobileOpen);
    console.log('영수증 등록 클릭');
  };

  const bookCreate = () => {
    navigate(`/club/${1}/book/create`);
  };
  const receiptList = () => {
    navigate(`/club/${1}/receipt/requestList`);
  };

  const bookList = () => {
    navigate(`club/${1}/book`);
  };

  const chart = () => {
    navigate(`club/${1}/book`);
  };

  const manage = () => {
    navigate(`club/${1}/manage`);
  };
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      <ListItemButton onClick={addHandleClick}>
        <ListItemText primary="등록" />
        {addOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={addOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={receipt} sx={{ pl: 4 }}>
            <ListItemIcon>
              <PlaylistAddIcon />
            </ListItemIcon>
            <ListItemText primary="영수증 등록" />
          </ListItemButton>

          <ListItemButton onClick={bookCreate} sx={{ pl: 4 }}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="거래 등록" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />

      <ListItemButton onClick={listHandleClick}>
        <ListItemText primary="내역" />
        {listOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={receiptList} sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="영수증 내역" />
          </ListItemButton>
          <ListItemButton onClick={bookList} sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="거래 내역" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />

      <ListItemButton onClick={chart}>
        <ListItemText primary="분석" />
      </ListItemButton>
      <Divider />

      <ListItemButton onClick={manage}>
        <ListItemText primary="모임관리" />
      </ListItemButton>
      <Divider />
    </List>
  );
}
