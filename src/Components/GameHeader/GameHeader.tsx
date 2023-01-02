import { Avatar, Container } from '@mui/material';
import { useSpring, config, animated } from '@react-spring/web';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useRecoilState } from 'recoil';
import { UpdateHeader } from '../../Data/interfaces';
import { ongoingGameState } from '../../Data/State';


function GameHeader({ update, target }: UpdateHeader) {

    useEffect(() => {
        if (target === 'step') {
            stepApi.start({
                from: {
                    background: 'yellow'
                },
                to: {
                    background: '#ff5722'
                },
            });
        } else {
            scoreApi.start({
                from: {
                    background: 'yellow'
                },
                to: {
                    background: '#3f51b5'
                },
            });
        }
    }, [update]);

    const [ongoingGameInfo, setOngoingGameInfo] = useRecoilState(ongoingGameState);

    const [scoreProps, scoreApi] = useSpring(() => ({
        background: '#3f51b5',
        config: config.molasses,
    }));

    const [stepProps, stepApi] = useSpring(() => ({
        background: '#ff5722',
        config: config.molasses,
    }));

    const AnimatedAvatar = animated(Avatar);

    const notifyChange = (type: string) => {
        if (type === 'step') {
            stepApi.start({
                from: {
                    background: 'yellow'
                },
                to: {
                    background: '#ff5722'
                },
            });
        } else {
            scoreApi.start({
                from: {
                    background: 'yellow'
                },
                to: {
                    background: '#3f51b5'
                },
            });
        }
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mr: 1 }}>
            <AnimatedAvatar sx={{ mr: 1, width: 50, height: 50 }} style={stepProps}>{ongoingGameInfo.currentStep}/{ongoingGameInfo.maxStep}</AnimatedAvatar>
            <AnimatedAvatar sx={{ width: 50, height: 50 }} style={scoreProps}>{ongoingGameInfo.score}</AnimatedAvatar>
        </Container>
    );
}

export default GameHeader