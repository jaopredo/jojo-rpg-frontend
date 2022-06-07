import React from 'react';

/* CSS */
import '../sass/register.scss';

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
        <CharForm {...props}/>
    </SubContainer>;
}

export default RegisterCharacter;