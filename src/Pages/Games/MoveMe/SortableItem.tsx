import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { VerbProps } from '../../../Data/interfaces';
import { Box, Stack, Typography, Container } from '@mui/material';
import { ItemBox } from './Styled';
import { Colors } from '../../../Data/defaults';


interface Props {
  item: VerbProps;
  pronoun: string;
  correction: string;
  showResult: boolean
}

export function SortableItem({ showResult, correction, item, pronoun }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.pos.toString() });

  const getBackgroundColor = () => {
    if (showResult) return correction === item.name ? "green" : "red"
    return "white"
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: "10px 0",
    padding: '0px',
    background: 'red'
  };


  return (
    <Stack direction="row" justifyContent="space-evenly" alignItems="center">
      <Typography sx={{ width: 100 }}>{pronoun}</Typography>
      <Container
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <ItemBox
          showresult={showResult}
          correction={correction === item.name ? Colors.green : Colors.red}
          sx={{
            display: 'flex',
            p: 3,
            m: 0,
            height: 50,
            cursor: 'pointer', minWidth: 100
          }}
          justifyContent="center"
          alignItems="center"
        >
          {item.name.split(' ')[0]}
        </ItemBox>
      </Container>
      <Typography>{item.name.split(' ')[1]}</Typography>
    </Stack>
  );
}