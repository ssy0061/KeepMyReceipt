import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { DeleteOutline, EditOutlined, InfoOutlined } from '@mui/icons-material';

import DialogWithIconButton from '../../../../components/DialogWithIconButton';
import { TagGuide } from '../ItemGuide/classification';
import { Transition } from '../../../../components/DialogWithIconButton/service';
import { filter, toFilterOption } from './service';
import {
  apiCreateTag,
  apiUpdateTag,
  apiGetLargeTags,
  apiDeleteTag,
} from '../../api/tagApi';

type ItemTagFirstType = {
  label: string;
  clubId: string;
  value: string;
  setValue: (value: string | number) => void;
  requestCreateValue: (value: string | number) => void;
};

export default function ItemTagFirst(props: ItemTagFirstType) {
  const [options, setOptions] = useState([]);

  const getAllTags = async () => {
    await apiGetLargeTags(props.clubId).then((res) => {
      console.log('getAllTags', res.data);
      setOptions(toFilterOption(res.data.data));
    });
  };

  const createTag = async (newValue: string, parentTag?: string) => {
    await apiCreateTag(props.clubId, newValue, parentTag).then(() => {
      getAllTags();
    });
  };

  const updateTag = async (tagId: number, newValue: string) => {
    await apiUpdateTag(props.clubId, tagId, newValue, null)
      .then(() => {
        getAllTags();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTag = async (tagId: number) => {
    await apiDeleteTag(tagId).then(() => {
      getAllTags();
    });
  };

  const [nameOnEdit, setNameOnEdit] = React.useState('');
  const [idOnEdit, setIdOnEdit] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameOnEdit(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
    tagName: string,
    tagId: number,
  ) => {
    // ????????? ?????? ??? ????????? ?????? ????????? ????????? ??????
    e.stopPropagation();
    setOpen(true);
    setNameOnEdit(tagName);
    setIdOnEdit(tagId);
  };

  const handleClose = () => {
    setOpen(false);
    setIdOnEdit(0);
    setNameOnEdit('');
  };

  const handleUpdate = () => {
    if (!nameOnEdit) {
      alert('??? ?????? ????????? ??? ????????????');
      return;
    }
    updateTag(idOnEdit, nameOnEdit);
    handleClose();
  };

  useEffect(() => {
    getAllTags();
    console.log(options);
  }, []);

  return (
    <>
      <Autocomplete
        /** 1. ?????? ????????? ????????? */
        options={options}
        renderOption={(props, option) => (
          <li {...props}>
            {option.tagName ? (
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>{option.name}</Typography>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={(e) => {
                        handleOpen(e, option.tagName, option.tagId);
                      }}
                    >
                      <EditOutlined />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        deleteTag(option.tagId);
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            ) : option.inputValue ? (
              <Typography>{option.inputValue} ??????</Typography>
            ) : (
              <Typography>??????????????? ?????? ??????!</Typography>
            )}
          </li>
        )}
        /** 2. ?????? ?????? ?????? */
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.name,
          );
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              name: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        /** 3. ?????? ?????? ??? ?????? */
        renderInput={(params) => (
          <Stack
            direction="row"
            alignItems="flex-end"
            spacing={1}
            marginBottom={1}
          >
            <TextField {...params} label={props.label} variant="standard" />
            <DialogWithIconButton
              icon={<InfoOutlined />}
              content={<TagGuide />}
            />
          </Stack>
        )}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name;
        }}
        /** 4. ??? ???????????? ????????? ?????? */
        value={{ name: props.value ? props.value : '' }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            props.setValue(newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            createTag(newValue.inputValue);
            props.setValue(newValue.inputValue);
          } else if (newValue && newValue.name) {
            props.setValue(newValue.name);
          } else {
            props.setValue('');
          }
        }}
        // autoHighlight
        // disableCloseOnSelect
        selectOnFocus
        clearOnEscape
        clearOnBlur
        handleHomeEndKeys
      />

      {/* ?????? ??????????????? */}
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        TransitionComponent={Transition}
        closeAfterTransition
        BackdropComponent={Backdrop}
        // BackdropProps={{ timeout: 500 }}
        // fullWidth
        // maxWidth="xs"
      >
        <DialogContent dividers>
          <TextField
            label="?????? ?????? ??????"
            value={nameOnEdit}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>??????</Button>
          <Button onClick={handleClose} color="secondary">
            ??????
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
