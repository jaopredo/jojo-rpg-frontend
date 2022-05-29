import styled, { keyframes } from 'styled-components';
import colors from '../modules/colors';
import { fadeIn } from 'react-animations';

export const Error = styled.div`
    background: ${colors.errorColor};
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: .7em;
`;

const screenErrorKeyframes = keyframes`
    0% {
        opacity: 0;
    }
    15% {
        opacity: 1;
    }
    75% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;
export const ScreenError = styled.div`
    background: ${colors.errorColor};
    color: white;
    font-size: 3.5vh;
    border-radius: 5px;
    font-weight: bold;
    padding: 10px;
    position: fixed;
    left: 50%;
    top: 50px;
    opacity: 0;

    transform: translate(-50%, 0);
    animation: 10s ${props => props.error?screenErrorKeyframes:''};
    animation-fill-mode: forwards;
`;
