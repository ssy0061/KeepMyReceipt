import React from 'react';
import { IconButton, ListItem } from '@mui/material';
import { Edit } from '@mui/icons-material';

import ListItemTextWithSubtext from '../../../domain/Book/Create/ListItemTextWithSubtext';
import toCurrency from '../../../services/toCurrency';

interface ItemInfoOnShowType {
  titleName: string;
  itemValue: string | number;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ItemInfoOnShow({
  titleName,
  itemValue,
  setEditable,
}: ItemInfoOnShowType) {
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={() => setEditable(true)}>
            <Edit />
          </IconButton>
        }
      >
        <ListItemTextWithSubtext
          text={titleName}
          subtext={
            typeof itemValue === 'number' ? toCurrency(itemValue) : itemValue
          }
          inset
        />
      </ListItem>
    </>
  );
}
