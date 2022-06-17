import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { MdClose } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

/* CSS */
import './style.scss';

/* COLORS */
import colors from '../../modules/colors';

/* COMPONENTS */
import { Error } from '../Messages';
import axios from 'axios';

/* COMPONENTES */
const RollContainer = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    background: ${colors.rollColor};
    text-align: center;

    width: 50%;
    min-height: 50%;
    padding: 20px;

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    color: white;
    
    border-radius: 10px;
    box-shadow: 3px 3px 3px #000000;
    animation: 1s ${keyframes`${fadeIn}`} ;
`;

function LevelUpForm({ setShowUpForm, charSpecs, charAttrs }) {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({ defaultValues: {
        newAttr: undefined,
        newSpec: undefined,
    } });

    const [ isNewAttr, setIsNewAttr ] = useState(true);
    const [ isNewSpec, setIsNewSpec ] = useState(false);

    const attrs = [
        { id: 'newStrengh', label: 'Força', formValue: 'strengh' },
        { id: 'newDexterity', label: 'Destreza', formValue: 'dexterity' },
        { id: 'newConstituition', label: 'Constituição', formValue: 'constituition' },
        { id: 'newEducation', label: 'Educação', formValue: 'education' },
        { id: 'newVigillance', label: 'Vigilância', formValue: 'vigillance' },
        { id: 'newCommonSense', label: 'Senso Comum', formValue: 'commonSense' },
        { id: 'newCharisma', label: 'Carisma', formValue: 'charisma' },
    ]
    const specs = {
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

    const onSubmit = data => {
        const { newAttr, newSpec } = data;
        let newData;

        if (!newAttr && !newSpec) {
            setError('noselected', { type: 'custom', message: 'Selecione algo!' });
            return;
        }

        const seekSpecArea = spec => {
            let actualArea;
            Object.keys(charSpecs).forEach(specArea => {
                Object.keys(charSpecs[specArea]).forEach(key => {
                    if (key === spec) actualArea = specArea;
                })
            })

            return actualArea;
        }

        if (newAttr) {
            newData = {
                newAttr: { [newAttr]: charAttrs[newAttr]+1 }
            }
        }
        if (newSpec) {
            newData = {
                newSpec: {
                    spec: newSpec,
                    label: seekSpecArea(newSpec)
                }
            }
        }

        axios.patch(`${process.env.REACT_APP_API_URL}/character/levelup`, newData, {
            headers: { authorization: `JOJO ${cookies.get('token')}` }
        })
        setShowUpForm(false);
        navigate(0);
    }

    return <RollContainer>
        <MdClose id='close-icon' onClick={() => setShowUpForm(false)}/>
        <h1>UPAR NÍVEL</h1>
        <form className='level-up-form' onSubmit={handleSubmit(onSubmit)}>
            <fieldset id='action'>
                <div>
                    <label htmlFor="newattr">Novo Atributo</label>
                    <input type="radio" name='whatDo' id='newattr' defaultChecked onChange={e => {
                        if (e.target.checked) {
                            setIsNewAttr(true);
                            setIsNewSpec(false);
                            resetField('newSpec')
                        };
                    }}/>
                </div>
                <div>
                    <label htmlFor="newspec">Nova Especialidade</label>
                    <input type="radio" name='whatDo' id='newspec' onChange={e => {
                        if (e.target.checked) {
                            setIsNewAttr(false);
                            setIsNewSpec(true);
                            resetField('newAttr')
                        }
                    }}/>
                </div>
            </fieldset>
            {isNewAttr && <fieldset>
                <legend>NOVO ATRIBUTO</legend>
                <ul className='generic-list new-attr-list'>
                    {React.Children.toArray(attrs.map(obj => <li>
                        <label htmlFor={obj.id}>{obj.label}</label>
                        <input
                            type="radio"
                            id={obj.id}
                            value={obj.formValue}
                            {...register(`newAttr`, {
                                onChange: () => clearErrors('noselected')
                            })}
                        />
                    </li>))}
                </ul>
                {errors.noselected && <Error>{errors.noselected.message}</Error>}
            </fieldset>}
            {isNewSpec && <fieldset>
                <legend>NOVA ESPECIALIDADE</legend>
                <select {...register('newSpec')}>
                    {React.Children.toArray(Object.keys(specs).map(area => <optgroup label={area}>
                        {React.Children.toArray(specs[area].map(
                            spec => !charSpecs[area][spec.id] &&
                                <option value={spec.id}>{spec.label}</option>
                        ))}
                    </optgroup>))}
                </select>
            </fieldset>}
            <button className='submit-button'>UPAR</button>
        </form>
    </RollContainer>;
}

export default LevelUpForm;