import React from 'react'
import { Autocomplete } from '@mui/material';
import ItemChip from '../ListChip/ItemChip';
import { StyledTextField } from './Styled';

interface Props {
  deleteFunc:(data: string) => void;
  changeFunc:(data: string[]) => void;
  selectList: string[];
  placeholder: string;
  currentList: string[];
  isTense?: boolean
}

const InputChip = ({placeholder, deleteFunc,changeFunc, selectList, currentList, isTense}: Props) => {

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={selectList}
      value={currentList}
      sx={{mb: 3}}
      onChange={(e: any, newValue) => changeFunc(newValue)}
      getOptionLabel={(option) => option}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <ItemChip isTense key={index} data={option} withDelete deleteFunc={deleteFunc}/>
        ))
      }

      renderInput={(params) => (
        <StyledTextField {...params} label={placeholder} placeholder={placeholder} variant="filled"
        />
      )}
    />
  )
}

export default InputChip