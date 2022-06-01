import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

/* CSS */
import './style.scss';

/* COMPONENTS */
import { ErrorSpan } from '../Messages';
import Habilidade from '../Habilidade';


function StandForm({ standState, setStandState }) {
    const [ gastos, setGastos ] = useState(0);
    const [ attrSpanError, setAttrSpanError ] = useState(false);
    const [actualAttrValues, setActualAttrValues] = useState({
        // Valores atuais para comparar se aumentou ou diminuiu
        strengh: 1,
        speed: 1,
        durability: 1,
        precision: 1,
        range: 1,
        development: 1,
    })
    const standAttrPoints = 12

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data)
    }

    useEffect(() => {
        gastos>standAttrPoints?setAttrSpanError(true):setAttrSpanError(false)
    }, [gastos])

    const handleAttrChange = function(e) {
        const { value, id } = e.target;

        // Checando se aumentou ou diminuiu
        Number(value) > actualAttrValues[id]?setGastos(gastos+1):setGastos(gastos-1);

        setActualAttrValues({
            ...actualAttrValues,
            [id]: Number(value),
        });
    }

    const attrInputInfos = [
        { label: 'Força', id: 'strengh' },
        { label: 'Velocidade', id: 'speed' },
        { label: 'Resistência', id: 'durability' },
        { label: 'Precisão', id: 'precision' },
        { label: 'Alcance', id: 'range' },
        { label: 'P.D', id: 'development' },
    ]

    return <form className='stand-register' onSubmit={handleSubmit(onSubmit)}>
        <fieldset id='basic-fieldset'>
            <ul className='generic-list'>
                <li>
                    <input type='text' id='name' {...register('basic.name', { required: true })} />
                </li>
                <li>
                    <label htmlFor='standType'>Tipo: </label>
                    <select id='standType' {...register('basic.standType', { required: true })}>
                        <option defaultChecked value="short-range">Curto Alcance</option>
                        <option value="long-range">Longo Alcance</option>
                        <option value="automatic">Automático</option>
                        <option value="independent">Independente</option>
                        <option value="colony">Colônia</option>
                        <option value="act">Atos</option>
                        <option value="object">Objeto</option>
                        <option value="union">União</option>
                        <option value="ability">Habilidade</option>
                        <option value="sharing">Compartilhado</option>
                    </select>
                </li>
                <li>
                    <label htmlFor='weakPoint'>Ponto fraco: </label>
                    <input id='weakPoint' type="text" {...register('basic.weakPoint')}/>
                </li>
            </ul>
        </fieldset>
        <fieldset id='attr-fieldset'>
            <p>Pontos Gastos <ErrorSpan error={attrSpanError} className='gasto-container'>{gastos}</ErrorSpan></p>
            <p>Máximo <span className='points-container'>{standAttrPoints}</span></p>

            <div className='attr-container'>
                <h3>ATRIBUTOS</h3>
                <ul className='generic-list'>
                    {React.Children.toArray(attrInputInfos.map(props => <li>
                        <label htmlFor={props.id}>{props.label}</label>
                        <input
                            type='number'
                            className='attribute'
                            min={1}
                            max={5}
                            defaultValue={1}
                            id={props.id}
                            {...register(`attributes.${props.id}`, {
                                required: true,
                                max: 5,
                                min: 1,
                                onChange: handleAttrChange,
                            })}
                        />
                    </li>
                    ))}
                </ul>
            </div>
        </fieldset>
        <fieldset id='substand-fieldset'>

        </fieldset>
        <fieldset id='abilitys-fieldset'>
            <Habilidade title={'Principal'} register={register}/>
        </fieldset>
        <div className='button-container'>
            <button type='submit'>ENVIAR</button>
        </div>
    </form>;
}

export default StandForm;