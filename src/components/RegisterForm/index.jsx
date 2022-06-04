import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* COMPONENTS */
import SubContainer from '../SubContainer';
import { Error } from '../Messages';

/* SCSS */
import './style.scss'

function RegisterForm({ setPlayerState }) {
    /**
     * Função com o formulário que vai registrar as informações do usuário:
     * Mostra erros dependendo se o usuário preencheou ou não o campo (Error Component)
     * Faz uma requisição ao backend para saber se o player já exite
     * Valida se a senha passada está correta
     */
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors }
    } = useForm();

    // O que fazer com o formulário
    const onSubmit = data => {
        // Validação da senha
        const { password, confPassword } = data;
        if (password !== confPassword) {  // Se as senhas forem diferentes
            setFocus('confPassword');  // Foco no confirmar a senha
            return;  // Retorno
        }

        // Filtro o CONFPASSWORD
        const newObj = Object.fromEntries(Object.entries(data).filter(
            ([key, value]) => key !== 'confPassword'
        ))

        setPlayerState(newObj) // Coloco os novos valores
        navigate('/register/character')
    }

    return <SubContainer><form className='player-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input id='email' type='email' {...register('email', {
            required: true,
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