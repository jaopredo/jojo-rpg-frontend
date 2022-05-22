import React from 'react';
import { useForm } from 'react-hook-form';

/* COMPONENTS */
import SubContainer from '../SubContainer';
import { Error } from '../Messages';

/* SCSS */
import './style.scss'

function RegisterForm({ playerState, setPlayerState }) {
    /**
     * Função com o formulário que vai registrar as informações do usuário:
     * Mostra erros dependendo se o usuário preencheou ou não o campo (Error Component)
     * Faz uma requisição ao backend para saber se o player já exite
     * Valida se a senha passada está correta
     */
    const { register, handleSubmit, formState: { errors } } = useForm();

    // O que fazer com o formulário
    const onSubmit = data => {
        console.log(data)
        console.log(playerState)
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