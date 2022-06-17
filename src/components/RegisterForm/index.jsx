import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import styled, { css } from 'styled-components';
import colors from '../../modules/colors';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

/* COMPONENTS */
import SubContainer from '../SubContainer';
import { Error } from '../Messages';

/* SCSS */
import './style.scss';

const EmailInput = styled.input`
    font-size: 1.3vw;
    border: 3px solid  ${props => props.error?colors.errorColor:"#0000000"};
    ${props => props.error && css`color: ${colors.errorColor}`};
`;

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

    // States para alteração da aparência do INPUT DE EMAIL
    const [ showPassword, setShowPassword ] = useState(false);
    const [ emailError, setEmailError ] = useState(false);
    const [ scrError, setSrcError ] = useState(false);
    const [ scrMsg, setSrcMsg ] = useState("");

    // O que fazer com o formulário
    const onSubmit = data => {
        // Validação da senha
        const { password, confPassword } = data;
        if (password !== confPassword) {  // Se as senhas forem diferentes
            setFocus('confPassword');  // Foco no confirmar a senha
            setSrcError(true);
            setSrcMsg("Suas senhas não coincidem!");
            return;  // Retorno
        }
        if (emailError) {
            setSrcError(true);
            setSrcMsg("Este email já está em uso!");
            return;
        }

        // Filtro o CONFPASSWORD
        data.confPassword = undefined;

        setPlayerCookie("email", data.email, {path: '/'});
        setPlayerCookie("password", data.password, {path: '/'});

        navigate('/register/character');
    }

    return <SubContainer><form className='player-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <EmailInput error={emailError} id='email' type='email' {...register('email', {
            required: true,
            onChange: e => {
                setSrcError(false)
                axios.post(`${process.env.REACT_APP_API_URL}/player/check`, { email: e.target.value }, {
                    headers: {
                        'Content-Type':  'application/json',
                        'Access-Control-Allow-Credentials' : 'true',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                    }
                })
                .then(resp => resp.data.exists?setEmailError(true):setEmailError(false))
            }
        })} />
        { errors.email && <Error>Esse campo é obrigatório!</Error> }

        <label htmlFor="password">Senha</label>
        <div className='eyes-container'>
            <input id='password' type={showPassword?'text':'password'} {...register('password', {
                required: true,
            })} />
            <AiFillEye className='eye' style={{
                display: showPassword?'block':'none'
            }} onClick={() => {
                setShowPassword(false)
            }}/>
            <AiFillEyeInvisible className='eye' style={{
                display: showPassword?'none':'block'
            }}  onClick={() => {
                setShowPassword(true)
            }} />
        </div>
        { errors.email && <Error>Esse campo é obrigatório!</Error> }

        <label htmlFor="confPassword">Confirmar Senha</label>
        <input id='confPassword'type={showPassword?'text':'password'} {...register('confPassword', {
            required: true,
            onChange: e => setSrcError(false)
        })} />
        { errors.email && <Error>Esse campo é obrigatório!</Error> }

        <button type='submit'>ENVIAR</button>
        { scrError && <Error error={scrError}>{scrMsg}</Error> }
    </form></SubContainer>;
}

export default RegisterForm;