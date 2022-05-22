import React from 'react';

/* COMPONENTS */
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

// O {...props} serve para passar o playerState e setPlayerState
const Register = (props) => <>
    <Header>REGISTRANDO</Header>
    <RegisterForm {...props}/>
</>;

export default Register;