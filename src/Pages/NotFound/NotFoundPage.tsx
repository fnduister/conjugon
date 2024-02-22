import { CenterFocusStrong } from '@mui/icons-material'
import { Button, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', background: '#f08086' }}>

            <Paper elevation={1} sx={{p: 5, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}} >
                <Typography variant='h1'>
                    404
                </Typography>
                <Typography variant='body2'>
                    Sorry this page does not exist
                </Typography>
                <Button variant='contained' sx={{ m: 3 }} color='warning' component={Link} to="/">Back to HomePage</Button>
            </Paper>
        </Container>
    )
}

export default NotFoundPage