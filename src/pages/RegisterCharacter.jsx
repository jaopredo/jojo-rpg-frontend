import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/* CSS */
import '../sass/registerCharacter.scss';

/* COMPONENTS */
import SubContainer from '../components/SubContainer';
import CharForm from '../components/CharForm';

/* IMAGES */
import FensLogo from '../images/logo-tarefa.png';

function RegisterCharacter(props) {
    return <SubContainer id='register-character-container'>
        <div className='logo-container'>
            <img src={FensLogo} id='fens-logo' alt="logo-tarefa" />
            <h2>FENS</h2>
        </div>
        <CharForm setCharState={props.setCharState}/>
    </SubContainer>;
}

export default RegisterCharacter;