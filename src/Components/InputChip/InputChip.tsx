import React from 'react'
import { Autocomplete } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';
import ItemChip from '../ListChip/ItemChip';
import { StyledTextField } from './Styled';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  deleteFunc:(data: string) => void;
  changeFunc:(data: string[]) => void;
  selectList: string[];
  placeholder: string;
  currentList: string[];
}

const InputChip = ({placeholder, deleteFunc,changeFunc, selectList, currentList}: Props) => {

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={selectList}
      value={currentList}
      sx={{mb: 3}}
      onChange={(e: any, newValue) => changeFunc(newValue)}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <ItemChip key={index} data={option} withDelete deleteFunc={deleteFunc}/>
        ))
      }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <StyledTextField {...params} label={placeholder} placeholder={placeholder}
        />
      )}
    />
  )
}

export default InputChip