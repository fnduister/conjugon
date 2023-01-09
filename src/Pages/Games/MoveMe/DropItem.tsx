import { Box } from '@mui/material'
import React from 'react'
import { useDrag } from 'react-dnd'

interface Props {
  id: number;
  name: string;
  itemType: string;
  showResult: boolean
  truth: string
}

export const DropItem = ({showResult, itemType, id, name, truth }: Props) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: itemType,
        item: { pos:id, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
  
  const getColor = () => {
    if (showResult) {
      return name !== truth ? "red" : "green" 
    } else {
      return isDragging ? 'blue' : 'none'
    }
  }
  
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 150,
          height: 60,
          background: getColor()
        }}
        ref={dragRef}>
            {name.split(" ")[0]}
        </Box>
    )
}