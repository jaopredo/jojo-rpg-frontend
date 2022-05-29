import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';
import { shake } from 'react-animations';
import { useNavigate } from 'react-router-dom';

/* CSS */
import './style.scss';
import colors from '../../modules/colors';

/* COMPONENTS */
import { ScreenError } from '../Messages';
const shakeKeyframes = keyframes`${shake}`;
const ErrorSpan = styled.span`
    background-color: ${props => props.error?colors.errorColor:'#343434'};
    animation: 500ms ${props => props.error?shakeKeyframes:''};
`

function CharForm({ setCharState }) {
    const navigate = useNavigate();
    const [gastos, setGastos] = useState(0);  // Pontos gastos nos atributos
    const [specPoints, setSpecsPoints] = useState(7);  // Minimo de especialidades
    const [actualAttrValues, setActualAttrValues] = useState({
        // Valores atuais para comparar se aumentou ou diminuiu
        strengh: 1,
        dexterity: 1,
        constituition: 1,
        education: 1,
        vigillance: 1,
        commonSense: 1,
        charisma: 1,
    })
    const attrPoints = 20;  // Pontos máximos pros atributos
    const [attrSpanError, setAttrSpanError] = useState(false);
    const [specSpanError, setSpecSpanError] = useState(false);

    // Valores para animação da validação
    const [scrErrMsg, setScrErrMsg] = useState('');
    const [isScrErr, setIsScrErr] = useState(false);

    // True ou falso para animação do erro

    const { register, handleSubmit, formState: { errors } } = useForm();

    /* FUNÇÃO QUE LIDA COM OS DADOS */
    const onSubmit = data => {
        if (specPoints < 0 || gastos > attrPoints) {
            setScrErrMsg('Você gastou mais pontos do que o permitido!');
            setIsScrErr(true);
            return;
        } else if (specPoints > 0 || gastos < attrPoints) {
            setScrErrMsg('Você não gastou todos os seus pontos!');
            setIsScrErr(true);
        };

        setCharState(data);
        navigate('/stand');
    };

    /* ALTERAR SPAN QUANDO gastos FOR NEGATIVO */
    useEffect(() => {
        gastos>attrPoints?setAttrSpanError(true):setAttrSpanError(false);
        specPoints<0?setSpecSpanError(true):setSpecSpanError(false);
    }, [gastos, specPoints]);

    /* FUNÇÕES DOS INPUTS */
    const handleAttrChange = function(e) {
        const { value, id } = e.target;

        // Checando se aumentou ou diminuiu
        Number(value) > actualAttrValues[id]?setGastos(gastos+1):setGastos(gastos-1);

        setActualAttrValues({
            ...actualAttrValues,
            [id]: Number(value),
        });
        setIsScrErr(false);
    }

    const handleSpecChange = function(e) {
        const { checked } = e.target;
        checked?setSpecsPoints(specPoints-1):setSpecsPoints(specPoints+1);
        setIsScrErr(false);
    };

    /* INFORMAÇÕES DOS INPUTS */
    const attrInputInfos = [
        { label: 'For', id: 'strengh' },
        { label: 'Des', id: 'dexterity' },
        { label: 'Const', id: 'constituition' },
        { label: 'Educ', id: 'education' },
        { label: 'Sens', id: 'commonSense' },
        { label: 'Vig', id: 'vigillance' },
        { label: 'Caris', id: 'charisma' },
    ]
    const specsInputInfos = {
        strengh: [
            { id: 'athletics', label: 'Atletismo', area: 'strengh' },
            { id: 'mindResistence', label: 'Resistência Psicológica', area: 'strengh' },
            { id: 'jump', label: 'Salto', area: 'strengh' },
            { id: 'fight', label: 'Briga', area: 'strengh' },
            { id: 'climb', label: 'Escalar', area: 'strengh' },
        ],

        dexterity: [
            { id: 'acrobacy', label: 'Acrobacia', area: 'dexterity' },
            { id: 'stealth', label: 'Furtividade', area: 'dexterity' },
            { id: 'aim', label: 'Mira', area: 'dexterity' },
            { id: 'dodge', label: 'Esquiva', area: 'dexterity' },
        ],

        constituition: [
            { id: 'force', label: 'Vigor', area: 'constituition' },
            { id: 'imunity', label: 'Imunidade', area: 'constituition' },
            { id: 'painResistence', label: 'Resistência a Dor', area: 'constituition' },
        ],

        education: [
            { id: 'history', label: 'História', area: 'education' },
            { id: 'geography', label: 'Geografia', area: 'education' },
            { id: 'math', label: 'Matemática', area: 'education' },
            { id: 'investigation', label: 'Investigação', area: 'education' },
            { id: 'forensic', label: 'Forense', area: 'education' },
            { id: 'sociology', label: 'Sociologia', area: 'education' },
            { id: 'tecnology', label: 'T.I', area: 'education' },
            { id: 'art', label: 'Arte', area: 'education' },
            { id: 'physics', label: 'Física', area: 'education' },
            { id: 'chemistry', label: 'Química', area: 'education' },
            { id: 'foreignLanguage', label: 'Língua Estrangeira', area: 'education' },
            { id: 'programming', label: 'Programação', area: 'education' },
            { id: 'policy', label: 'Política', area: 'education' },
            { id: 'religion', label: 'Religião', area: 'education' },
            { id: 'mechanic', label: 'Mecânico', area: 'education' },
            { id: 'biology', label: 'Biologia', area: 'education' },
        ],

        vigillance: [
            { id: 'reflex', label: 'Reflexo', area: 'vigillance' },
            { id: 'perception', label: 'Percepção', area: 'vigillance' },
            { id: 'insight', label: 'Intuição', area: 'vigillance' },
        ],

        commonSense: [
            { id: 'computer', label: 'Usar Computador', area: 'commonSense' },
            { id: 'medicine', label: 'Medicina', area: 'commonSense' },
            { id: 'bribery', label: 'Suborno', area: 'commonSense' },
            { id: 'survival', label: 'Sobrevivência', area: 'commonSense' },
            { id: 'break', label: 'Arrombar', area: 'commonSense' },
            { id: 'cooking', label: 'Cozinhar', area: 'commonSense' },
            { id: 'firstAid', label: 'Primeiros-socorros', area: 'commonSense' },
            { id: 'drive', label: 'Dirigir', area: 'commonSense' },
        ],

        charisma: [
            { id: 'intimidation', label: 'Intimidação', area: 'charisma' },
            { id: 'cheating', label: 'Enganação', area: 'charisma' },
            { id: 'acting', label: 'Atuação', area: 'charisma' },
            { id: 'charm', label: 'Charme', area: 'charisma' },
            { id: 'sexy', label: 'Seduzir', area: 'charisma' },
            { id: 'persuasion', label: 'Persuasão', area: 'charisma' },
        ]
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset id='basic-fieldset'>
            <ul className='generic-list'>
                <li>
                    <input type='text' id='name' {...register('basic.name', { required: true })} />
                </li>
                <li>
                    <label htmlFor='race'>Raça: </label>
                    <select id='race' {...register('basic.race', { required: true })}>
                        <option defaultChecked value="human">HUMANO</option>
                        <option value="vampire">VAMPÍRO</option>
                        <option value="rockman">HOMEM-PEDRA</option>
                        <option value="alien">ALIENÍGENA</option>
                    </select>
                </li>
                <li>
                    <label htmlFor='age'>Idade: </label>
                    <input id='age' type='number' min={20} max={70} {...register('basic.age', {
                        required: true,
                        max: 70,
                        min: 20,
                    })} />
                </li>
                <li>
                    <label htmlFor='occupation'>Profissão: </label>
                    <input id='occupation' type="text" {...register('basic.occupation', { required: true })}/>
                </li>
            </ul>
        </fieldset>
        <fieldset id='attr-fieldset'>
            <p>Pontos Gastos <ErrorSpan error={attrSpanError} className='gasto-container'>{gastos}</ErrorSpan></p>
            <p>Máximo <span className='points-container'>{attrPoints}</span></p>

            <div className='attr-container'>
                <h3>ATRIBUTOS</h3>
                <ul className='generic-list'>
                    {React.Children.toArray(attrInputInfos.map(props => <li>
                        <label htmlFor={props.id}>{props.label}</label>
                        <input
                            type='number'
                            className='attribute'
                            min={1}
                            max={10}
                            defaultValue={1}
                            id={props.id}
                            {...register(`attributes.${props.id}`, {
                                required: true,
                                max: 10,
                                min: 1,
                                onChange: handleAttrChange,
                            })}
                        />
                    </li>
                    ))}
                </ul>
            </div>
        </fieldset>
        <fieldset id='specs-fieldset'>
            <h3>Especialidades</h3>
            <ErrorSpan error={specSpanError}>{specPoints}</ErrorSpan>
            <table>
                <thead>
                    <tr><th>Nome</th><th>Check</th></tr>
                </thead>
                {React.Children.toArray(Object.keys(specsInputInfos).map(
                    area => <tbody className={`${area}-container`}>
                        {React.Children.toArray(specsInputInfos[area].map(props => <tr className={props.area}>
                            <td><label htmlFor={props.id}>{props.label}</label></td>
                            <td><input type='checkbox' id={props.id} {...register(
                                `specialitys.${props.area}.${props.id}`,
                                {
                                    onChange: handleSpecChange
                                }
                            )}/></td>
                        </tr>))}
                    </tbody>
                ))}
            </table>
        </fieldset>
        <div className='button-container'>
            <button type='submit'>ENVIAR</button>
            {isScrErr&&<ScreenError error={isScrErr}>{scrErrMsg}</ScreenError>}
        </div>
    </form>;
}

export default CharForm;