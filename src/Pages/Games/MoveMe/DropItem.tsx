import { useSortable } from '@dnd-kit/sortable'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useDrag } from 'react-dnd'

interface Props {
  id: string;
  name: string;
  // itemType: string;
  // showResult: boolean
  // truth: string
}

export const DropItem = ({ id, name }: Props) => {
  //   const [{ isDragging }, dragRef] = useDrag({
  //       type: itemType,
  //       item: { pos:id, name },
  //       collect: (monitor) => ({
  //           isDragging: monitor.isDragging()
  //       })
  //   })

  // const getColor = () => {
  //   if (showResult) {
  //     return name !== truth ? "red" : "green" 
  //   } else {
  //     return isDragging ? 'blue' : 'none'
  //   }
  // }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none'
  }

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ m: 2, flexWrap: 'wrap', maxWidth: 'md' }}
      alignItems='center'
      justifyContent='space-between'
      style={{touchAction: 'none'}}
    >
      <Typography>
        je
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 150,
          background: 'white',
          height: 60,
        }}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {name.split(" ")[0]}
      </Box>
      <Typography>
        {name.split(" ")[1]}
      </Typography>
    </Stack>

  )
}