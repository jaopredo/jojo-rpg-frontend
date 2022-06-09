import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { MdClose } from 'react-icons/md';

/* CSS */
import './style.scss';

/* COLORS */
import colors from '../../modules/colors';

/* COMPONENTES */
const RollContainer = styled.div`
    background: ${colors.rollColor};

    width: 50%;
    height: 40%;
    padding: 20px;

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    color: white;
    
    border-radius: 10px;
    box-shadow: 3px 3px 3px #000000;
    animation: 1s ${keyframes`${fadeIn}`} ;
`;

function DiceRoll({ children, setRolling }) {
    const handleRollDice = () => {

    }
    
    useEffect(() => {
        
    }, []);

    return <RollContainer>
        <MdClose id='close-icon' onClick={e => setRolling(false)}/>
        <div className='content-container'>
            <h1>RESULTADO DA ROLAGEM</h1>
            { children }
        </div>
    </RollContainer>;
}

export default DiceRoll;