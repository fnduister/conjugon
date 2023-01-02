import { Modal, Box, Typography, Container, Button, Avatar } from '@mui/material';
import React, { MouseEventHandler } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ongoingGameState } from '../../../Data/State';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    flexDirection: 'column',
    width: 400,
    background: "#1a1a1a",
    border: 'none',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
};

interface Props {
    open: boolean;
    handleClose: () => void
}

const Score = ({ open, handleClose }: Props) => {
    const [ongoingGame, setOngoingGame] = useRecoilState(ongoingGameState)
    const navigateTo = useNavigate()

    const closing = () => {
        handleClose()
    }

    const handleQuit = () => {
        navigateTo('/pregame')
    }

    const getBackground = (score: number): string => {
        if (score > 80) {
            return "#b0f2b4"
        } else if (score > 60) {
            return "#baf2e9"
        } else if (score > 40) {
            return "#bad7f2"
        }
        return "#f2bac9"
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Avatar sx={{ width: 230, background: getBackground(Math.floor(ongoingGame.score / ongoingGame.maxScore * 100)), height: 230, alignSelf: 'center', m: 3, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <Typography id="modal-modal-description" variant='h1' sx={{ mt: .5 }}>
                            {Math.floor(ongoingGame.score / ongoingGame.maxScore * 100)}
                        </Typography>
                        <Typography variant="body1">%</Typography>
                    </Box>
                </Avatar>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant='contained' sx={{ width: 200, m: 1 }} onClick={closing}>Recommencer</Button>
                    <Button variant='contained' sx={{ width: 200, m: 1 }} onClick={handleQuit}>Sortir</Button>
                </Container>
            </Box>
        </Modal >
    )
}

export default Score