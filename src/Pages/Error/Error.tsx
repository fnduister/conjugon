import React from 'react'
import { Container, Typography } from '@mui/material';
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error: any = useRouteError();
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', width: 500, height: 500, justifyContent: 'center' }}>
      <Typography variant='h1'>
        Oops!
      </Typography>
      <Typography>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant='h5'>
        <i>{error.data}</i>
        <i>{error}</i>
      </Typography>
    </Container>
  )
}

export default Error