import styled, { css } from 'styled-components';
import colors from '../modules/colors';

const ValidationInput = styled.input`
    font-size: 1.3vw;
    border: 3px solid  ${props => props.error?colors.errorColor:"#0000000"};
    ${props => props.error && css`color: ${colors.errorColor}`};
`;

export default ValidationInput;