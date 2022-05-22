import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* COMPONENTS */
import Header from '../components/Header/';
import SubContainer from '../components/SubContainer';

/* CORES */
import colors from '../modules/colors';

const Button = styled.button`
    background-color: ${colors.gray};
    color: white;
    font-size: 4vw;
    font-family: 'Recursive', sans-serif;
    padding: 10px;
    border: none;
    border-radius: 5px;
    transition: transform 0.3s;
    &:hover { background-color: ${colors.grayHover}; transform: scale(1.2) }
    &:active { background-color: ${colors.grayActive}; }
`;

function Choose() {
    return (
        <>
            <Header>JOJO'S RPG</Header>
            <SubContainer>
                <Link to='/login'><Button>LOGIN</Button></Link>
                <Link to='/register'><Button>CADASTRAR</Button></Link>
            </SubContainer>
        </>
    );
}

export default Choose;