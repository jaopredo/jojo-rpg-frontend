import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/* CSS */
import './style.scss';

/* COMPONENTS */
import { Error } from '../Messages'

function CharForm({ setCharState }) {
    const [gastos, setGastos] = useState();
    const attrPoints = 20;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    const attrInputInfos = [
        { label: 'For', id: 'strengh' },
        { label: 'Des', id: 'dexterity' },
        { label: 'Const', id: 'constituition' },
        { label: 'Educ', id: 'education' },
        { label: 'Sens', id: 'commonSense' },
        { label: 'Vig', id: 'vigillance' },
        { label: 'caris', id: 'charism' },
    ]
    const specsInputInfos = [
        { id: 'athletics', label: 'Atletismo', area: 'strengh' },
        { id: 'mindResistence', label: 'Resistência Psicológica', area: 'strengh' },
        { id: 'jump', label: 'Salto', area: 'strengh' },
        { id: 'fight', label: 'Briga', area: 'strengh' },
        { id: 'climb', label: 'Escalar', area: 'strengh' },

        { id: 'acrobacy', label: 'Acrobacia', area: 'dexterity' },
        { id: 'stealth', label: 'Furtividade', area: 'dexterity' },
        { id: 'aim', label: 'Mira', area: 'dexterity' },
        { id: 'dodge', label: 'Esquiva', area: 'dexterity' },

        { id: 'force', label: 'Vigor', area: 'constituition' },
        { id: 'imunity', label: 'Imunidade', area: 'consituition' },
        { id: 'painResistence', label: 'Resistência a Dor', area: 'constituition' },

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

        { id: 'reflex', label: 'Reflexo', area: 'vigillance' },
        { id: 'perception', label: 'Percepção', area: 'vigillance' },
        { id: 'insight', label: 'Intuição', area: 'vigillance' },

        { id: 'computer', label: 'Usar Computador', area: 'commonSense' },
        { id: 'medicine', label: 'Medicina', area: 'commonSense' },
        { id: 'bribery', label: 'Suborno', area: 'commonSense' },
        { id: 'survival', label: 'Sobrevivência', area: 'commonSense' },
        { id: 'break', label: 'Arrombar', area: 'commonSense' },
        { id: 'cooking', label: 'Cozinhar', area: 'commonSense' },
        { id: 'firstAid', label: 'Primeiros-socorros', area: 'commonSense' },
        { id: 'drive', label: 'Dirigir', area: 'commonSense' },

        { id: 'intimidation', label: 'Intimidação', area: 'charisma' },
        { id: 'cheating', label: 'Enganação', area: 'charisma' },
        { id: 'acting', label: 'Atuação', area: 'charisma' },
        { id: 'charm', label: 'Charme', area: 'charisma' },
        { id: 'sexy', label: 'Seduzir', area: 'charisma' },
        { id: 'persuasion', label: 'Persuasão', area: 'charisma' },
    ]

    return <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset id='basic-fieldset'>
            <ul className='generic-list'>
                <li>
                    <input type='text' id='name' {...register('basic.name', { required: true })} />
                </li>
                <li>
                    <label htmlFor='race'>Raça: </label>
                    <select id='race' {...register('basic.race', { required: true })}>
                        <option value="human">HUMANO</option>
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
            <p>Pontos Gastos <span className='gasto-container'>{gastos}</span></p>
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
                            id={props.id}
                            {...register(`attributes.${props.id}`, {
                                required: true,
                                max: 10,
                                min: 1,
                            })}
                        />
                    </li>
                    ))}
                </ul>
            </div>
        </fieldset>
        <fieldset id='specs-fieldset'>
            <table>
                <thead>
                    <tr><td>Nome</td><td>Check</td></tr>
                </thead>
                <tbody>
                    {React.Children.toArray(specsInputInfos.map(props => <tr>
                        <td><label htmlFor={props.id}>{props.label}</label></td>
                        <td><input type='checkbox' id={props.id} {...register(
                            `specialitys.${props.area}.${props.id}`,
                        )}/></td>
                    </tr>))}
                </tbody>
            </table>
        </fieldset>
        <div className='button-container'><button type='submit'>ENVIAR</button></div>
    </form>;
}

export default CharForm;