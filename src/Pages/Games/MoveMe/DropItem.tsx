import { useSortable } from '@dnd-kit/sortable'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import { VerbProps } from '../../../Data/interfaces'

interface Props {
  item: VerbProps
}

export const DropItem = ({ item }: Props) => {
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
  } = useSortable({ id: item.pos.toString() })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none'
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, touchAction: 'none' }}
      {...attributes}
      {...listeners}
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

      >
        {item.name.split(" ")[0]}
      </Box>
      <Typography>
        {item.name.split(" ")[1]}
      </Typography>
    </div>

  )
}