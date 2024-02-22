import React, { useState } from 'react'
import { Paper, Chip, styled } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ItemChip from './ItemChip';
import { GroupInfo } from '../../Data/interfaces';

interface Props {
  chipData: GroupInfo[];
  selectFunc: (data: string[], selected: boolean) => void
  isTense?: boolean;
  withDelete?: boolean;
  deleteGroup?: (data: string) => void
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ListChip = ({ withDelete, deleteGroup, chipData, selectFunc, isTense }: Props) => {

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        listStyle: 'none',
        flexWrap: 'wrap',
        p: 0.5,
        m: 0,
        mb: 3,
        width: "100%"
      }}
      component="ul"
    >
      {chipData.map((data, key) => {
        return (
          <ListItem key={key} >
            <ItemChip
              deleteFunc={deleteGroup}
              withDelete={withDelete}
              isTense={isTense}
              selectFunc={selectFunc}
              data={data.title}
              select
              hover
              popperData={data.data}
            />
          </ListItem>
        );
      })}
    </Paper>
  )
}

export default ListChip