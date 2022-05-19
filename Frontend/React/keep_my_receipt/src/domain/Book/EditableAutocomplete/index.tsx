import { useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Cancel, Edit, InfoOutlined } from '@mui/icons-material';
import { apiReadAllCategory } from '../api/categoryApi';
import { TypeNameKeys } from '../bookReducer';
import { ASType, BSType } from '../types';

type OptionType = {
  inputValue?: string;
  name: string;
};

type EditableAutocompleteType = {
  label: string;
  clubId: string;
  typeName: TypeNameKeys;
  largeCatName: string;
  value: string;
  setValue: (value: string | number) => void;
  requestCreateValue: (value: string | number) => void;
};

const filter = createFilterOptions<OptionType>();

const toFilterOption = (objectArray: (BSType & ASType)[]) =>
  objectArray.map((obj) => ({
    ...obj,
    name: obj.ascName ? obj.ascName : obj.bscName,
  }));

export default function EditableAutocomplete(props: EditableAutocompleteType) {
  const [options, setOptions] = useState([]);

  const getAllCategory = async () => {
    if (props.largeCatName) {
      await apiReadAllCategory(
        props.clubId,
        props.typeName,
        props.largeCatName,
      ).then((res) => {
        console.log('getAllCategory', res);
        setOptions(toFilterOption(res.data.data));
      });
    }
  };

  useEffect(() => {
    getAllCategory();
  }, [props.largeCatName]);

  return (
    <>
      <Autocomplete
        /** 1. 옵션 리스트 렌더링 */
        options={options}
        renderOption={(props, option) => (
          <li {...props}>
            {option.name}
            <Edit />
            <Cancel />
          </li>
        )}
        /** 2. 옵션 검색 결과 */
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
        /** 3. 옵션 결과 중 선택 */
        renderInput={(params) => (
          <Stack
            direction="row"
            alignItems="flex-end"
            spacing={1}
            marginBottom={1}
          >
            <TextField
              {...params}
              required
              label={props.label}
              variant="standard"
            />
            <InfoOutlined />
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
        /** 4. 값 바뀌면서 트리거 발동 */
        value={props.value ? { name: props.value } : null}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            props.setValue(newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            props.setValue(newValue.inputValue);
            props.requestCreateValue(newValue.inputValue);
          } else if (newValue && newValue.name) {
            props.setValue(newValue.name);
          } else {
            props.setValue('');
          }
        }}
        // autoHighlight
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
      />
    </>
  );
}
