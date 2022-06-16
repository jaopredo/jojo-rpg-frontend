import React from 'react';

/* COMPONENTS */
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

function Login(props) {
    return <>
        <Header>LOGIN</Header>
        <LoginForm {...props} />
    </>;
}

export default Login;