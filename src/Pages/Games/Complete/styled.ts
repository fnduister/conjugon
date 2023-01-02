import { TextField } from '@mui/material';
import styled, { keyframes } from 'styled-components'

interface InputProps {
    showresult: boolean;
    correction: string;
}

const showResultFrames = (y: string) => keyframes`
    0% {
        background: 'white'
    }
    50% {
        background: y
    }
    100% {
        background: 'white'
    }
`;

export const Input = styled(TextField) <InputProps>`
    & .MuiFilledInput-root:hover {background-color: #D0E6FF}
    & .MuiFilledInput-root {
        margin: 5px;
        background-color : ${props => props.showresult ? props.correction : "white"};
        transition: background-color 0.5s ease-in
        /* animation: ${props => showResultFrames(props.correction)} 3s ease-in */
    }

    & .css-si665t-MuiInputBase-root-MuiFilledInput-root.Mui-focused{
        /* background-color : #FEE8C7; */
        background-color : white;
    }
    /* & .css-si665t-MuiInputBase-root-MuiFilledInput-root.Mui-focused:hover{
        background-color : blue;
    } */
    & .css-xf0not-MuiFormLabel-root-MuiInputLabel-root.Mui-focused{
        color: black;
    }

    /* & legend > span {
        color: black;
        opacity: 1;
    }

    & legend .css-14lo706{

    } */
`