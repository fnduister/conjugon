import { Avatar, Container, Typography } from '@mui/material'
import { deepOrange, blue } from '@mui/material/colors'
import { useSpring, config, animated } from '@react-spring/web';
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { ongoingGameState } from '../../Data/State';

const Games = () => {
  const ongoingGame = useRecoilValue(ongoingGameState)


  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default Games