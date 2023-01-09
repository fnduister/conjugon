import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import { DropItem } from './DropItem';
import { VerbProps } from './../../../Data/interfaces';

interface Props {
  children?: JSX.Element,
  itemType: string,
  item: VerbProps
  id: number
  showResult: boolean
  moveItem: (item: VerbProps, newPos: number) => void
  truth: string
}

const DropArea = ({item, children, itemType,truth, id, moveItem, showResult}: Props) => {
  
  const [{ isOver }, dropRef] = useDrop({
      accept: 'verb',
    drop: (item: VerbProps) => {
      // setDroppedItem(item)
      moveItem(item, id)
    },
      collect: (monitor) => ({
          isOver: !!monitor.isOver()
      })
  })

  return (
    <Box ref={dropRef} sx={{
      m: 2,
      width: 150,
      display: 'flex',
      border: .4,
      borderRadius: '5px',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      background: isOver ? 'cyan' : 'white'
    }}>
      <DropItem showResult={showResult} truth={truth} itemType={itemType} name={item.name} id={item.pos} />
    </Box>
  )
}

export default DropArea