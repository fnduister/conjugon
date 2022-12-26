import React, { useState } from 'react'
import { Paper, ListItem, Chip } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ItemChip from './ItemChip';
import { GroupInfo } from '../../Data/interfaces';

interface Props {
  chipData: GroupInfo[];
  selectFunc: (data: string[], selected: boolean) => void
}

const ListChip = ({ chipData, selectFunc }: Props) => {

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        listStyle: 'none',
        flexWrap: 'wrap',
        p: 0.5,
        m: 0,
        mb: 3
      }}
      component="ul"
    >
      {chipData.map((data, key) => {
        return (
          <ListItem key={key} >
            <ItemChip selectFunc={selectFunc} data={data.title} select hover popperData={data.data} />
          </ListItem>
        );
      })}
    </Paper>
  )
}

export default ListChip