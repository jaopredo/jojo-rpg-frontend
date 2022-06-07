import React from 'react';

/* CSS */
import '../sass/register.scss';

/* IMAGES */
import FensLogo from '../images/logo-tarefa.png';

/* COMPONENTS */
import SubContainer from '../components/SubContainer';
import StandForm from '../components/StandForm';

function RegisterStand(props) {
    return <SubContainer>
        <div className='logo-container'>
            <img src={FensLogo} id='fens-logo' alt="logo-tarefa" />
            <h2>FENS</h2>
        </div>
        <StandForm {...props} />
    </SubContainer>;
}

export default RegisterStand;