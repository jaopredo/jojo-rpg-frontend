import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* COMPONENTS */
import Loader from '../Loader';
import SubContainer from '../SubContainer';
import { Error } from '../Messages';

function LoginForm({ setCookie }) {
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
        formState: { errors }
    } = useForm();

    // State do loading
    const [ isLoading, setIsLoading ] = useState(false);

    // States para alteração da aparência do INPUT DE EMAIL
    const [ scrError, setSrcError ] = useState(false);
    const [ scrMsg, setSrcMsg ] = useState("");

    // O que fazer com o formulário
    const onSubmit = data => {
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/player/login`, data).then(resp => {
            setIsLoading(false)
            if (resp.data.error) {
                setSrcError(true);
                setSrcMsg(resp.data.msg);
                return;
            }
            setSrcError(false);
            setCookie('token', resp.data.token);
            navigate('/logged')
        })
    }

    return <SubContainer><form className='player-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input id='email' type='email' {...register('email', {
            required: true,
            onChange: () => setSrcError(false)
        })} />
        { errors.email && <Error>Esse campo é obrigatório!</Error> }

        <label htmlFor="password">Senha</label>
        <input id='password' type='password' {...register('password', {
            required: true,
            onChange: () => setSrcError(false)
        })} />
        { errors.password && <Error>Esse campo é obrigatório!</Error> }

        <button type='submit'>ENVIAR</button>
        { scrError && <Error error={scrError}>{scrMsg}</Error> }
        {isLoading && <Loader/>}
    </form></SubContainer>;
}

export default LoginForm;