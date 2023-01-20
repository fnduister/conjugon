import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { VerbProps } from '../../../Data/interfaces';
import { Box, Stack, Typography, Container } from '@mui/material';


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
    padding: '15px',
    width: 200,
    margin: '15px'
  };


  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="center">
      <Typography sx={{ width: 100 }}>{pronoun}</Typography>
      <Container>
        <Box sx={{ cursor: 'pointer',     background: getBackgroundColor,
 }} justifyContent="center" alignItems="center" ref={setNodeRef} style={style} {...attributes} {...listeners}>
          {item.name.split(' ')[0]}
        </Box>
      </Container>
      <Typography>{item.name.split(' ')[1]}</Typography>
    </Stack>
  );
}