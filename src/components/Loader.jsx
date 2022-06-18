import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
`;
const Loader = styled.div`
    width: 100px;
    height: 100px;
    border: 10px solid #303030;
    border-top: 10px solid #979797;
    border-radius: 50%;
    animation: 1s ${spin} infinite;
`;

export default Loader;