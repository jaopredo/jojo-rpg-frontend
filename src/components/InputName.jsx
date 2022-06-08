import styled from 'styled-components';
import colors from '../modules/colors';

const NameInput = styled.input`
    border-bottom: 1px solid #adadad;
    font-size: 1.7em;
    color: ${colors.nameInputColor};
    outline: none;
    text-align: center;
    width: 100%;
`;

export default NameInput;