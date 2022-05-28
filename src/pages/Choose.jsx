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
    font-size: 3vw;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bolder;
    padding: 13px;
    border: none;
    border-radius: 5px;
    transition: transform 0.3s;
    &:hover { background-color: ${colors.grayHover}; transform: scale(1.2); cursor: pointer }
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