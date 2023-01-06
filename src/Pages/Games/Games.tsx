import { Stack } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
const Games = () => {
  return (
    <Stack justifyContent='center' alignItems='center' sx={{m:5}}>
      <Outlet />
    </Stack>
  )
}

export default Games