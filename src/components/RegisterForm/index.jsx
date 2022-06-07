import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import styled from 'styled-components';

/* COMPONENTS */
import SubContainer from '../SubContainer';
import { Error } from '../Messages';

/* SCSS */
import './style.scss'

const EmailInput = styled.input`
    font-size: 1.3vw;
    border: 3px solid  ${props => props.error?"#ec5252":"#0000000"};
    color: ${props => props.error?"#ec5252":"black"}
`

function RegisterForm({ setPlayerCookie }) {
    /**
     * Função com o formulário que vai registrar as informações do usuário:
     * Mostra erros dependendo se o usuário preencheou ou não o campo (Error Component)
     * Faz uma requisição ao backend para saber se o player já exite
     * Valida se a senha passada está correta
     */
    const navigate = useNavigate();
    const cookies = new Cookies();
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors }
    } = useForm({
        defaultValues: {
            "email": cookies.get('email'),
            "password": cookies.get('password'),
            "confPassword": cookies.get('password'),
        }
    });

    // O que fazer com o formulário
    const onSubmit = data => {
        // Validação da senha
        const { password, confPassword } = data;
        if (password !== confPassword) {  // Se as senhas forem diferentes
            setFocus('confPassword');  // Foco no confirmar a senha
            return;  // Retorno
        }

        // Filtro o CONFPASSWORD
        data.confPassword = undefined;

        setPlayerCookie("email", data.email, {path: '/'});
        setPlayerCookie("password", data.password, {path: '/'});

        navigate('/register/character');
    }

    // States para alteração da aparência do INPUT DE EMAIL
    const [ emailError, setEmailError ] = useState(false);

    return <SubContainer><form className='player-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <EmailInput error={emailError} id='email' type='email' {...register('email', {
            required: true,
            onChange: e => {
                axios.post(`${process.env.REACT_APP_API_URL}/player/check`, { email: e.target.value })
                .then(resp => resp.data.exists?setEmailError(true):setEmailError(false))
            }
        })} />
        { errors.email && <Error>Esse campo é obrigatório!</Error> }

        <label htmlFor="password">Senha</label>
        <input id='password' type='password' {...register('password', {
            required: true,
        })} />
        { errors.email && <Error>Esse campo é obrigatório!</Error> }

        <label htmlFor="confPassword">Confirmar Senha</label>
        <input id='confPassword' type='password' {...register('confPassword', {
            required: true,
        })} />
        { errors.email && <Error>Esse campo é obrigatório!</Error> }

        <button type='submit'>ENVIAR</button>
    </form></SubContainer>;
}

export default RegisterForm;