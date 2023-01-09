import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ongoingGameState, timerState } from '../../Data/State';

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color="warning" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

interface Props {
  nextStep: () => void;
  paused?: boolean;
}

export default function LinearWithValueLabel({ nextStep, paused }: Props) {
  const [progress, setProgress] = useRecoilState(timerState);
  const ongoingGameInfo = useRecoilValue(ongoingGameState)

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (!paused) {
        setProgress((prevProgress) => {
          return (prevProgress >= 100 ? 0 : prevProgress + 1);
        })
      }
    }, Math.floor(ongoingGameInfo.maxTime));
    if (progress >= 100) { nextStep() }
    return () => {
      clearInterval(timer);
    };
  }, [progress, paused]);


  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}