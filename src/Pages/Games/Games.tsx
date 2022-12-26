import { Avatar, Container, Typography } from '@mui/material'
import { deepOrange, blue } from '@mui/material/colors'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { ongoingGameState } from '../../Data/State';

const Games = () => {
  const ongoingGame = useRecoilValue(ongoingGameState)

  return (
    <Container>
      <Container sx={{ m: 0, p: 0,display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Typography variant="h5" sx={{ml: 2}}>
          Jeu: Race
        </Typography >
        <Container sx={{ width: 120, display: 'flex', flexDirection: 'row', alignItems:'center' , justifyContent: 'space-between', mr: 1 }}>
          <Avatar sx={{mr: 1, width: 50, height: 50, bgcolor: deepOrange[500] }}>{ongoingGame.currentStep}/{ongoingGame.maxStep}</Avatar>
          <Avatar sx={{ width: 50, height: 50, bgcolor: blue[100] }}>{ongoingGame.score}</Avatar>
        </Container>
      </Container>
      <Outlet />
    </Container>
  )
}

export default Games