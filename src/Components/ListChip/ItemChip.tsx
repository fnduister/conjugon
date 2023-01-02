import React, { useState } from 'react'
import { ListItem, Chip, Popover, Typography } from '@mui/material'
import { VerbToText } from '../../Data/defaults';

interface Props {
  data: string;
  popperData?: string[];
  withDelete?: boolean;
  select?: boolean;
  hover?: boolean;
  deleteFunc?: (data: string) => void
  selectFunc?: (data: string[], selected: boolean) => void
  isTense?: boolean
}

const ItemChip = ({isTense, selectFunc, popperData, hover, select, data, withDelete, deleteFunc }: Props) => {
  const [selected, setSelected] = useState<boolean>(false)

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    console.log("what?")
    setSelected(!selected)
    
    if (selectFunc && popperData) {
      selectFunc(popperData, selected)
    }
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <Chip
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        size='small'
        onMouseEnter={hover ? handlePopoverOpen : undefined}
        onMouseLeave={hover ? handlePopoverClose : undefined}
        color={selected ? "warning" : "primary"}
        label={data}
        onClick={select ? handleClick : undefined}
        onDelete={(withDelete && deleteFunc) ? (e: any) => deleteFunc(data) : undefined}
      />
      {popperData && <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {
          popperData.map((data, key) =>
            <Typography key={key} sx={{ p: 1 }}>{isTense ? VerbToText[data as keyof typeof VerbToText] : data}</Typography>
          )
        }
      </Popover>}
    </>
  )
}

export default ItemChip