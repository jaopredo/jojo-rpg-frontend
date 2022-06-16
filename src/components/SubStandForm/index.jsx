import React, { useState, useEffect } from 'react';

/* CSS */
import './style.scss';

/* COMPONENTS */
import { ErrorSpan } from '../Messages';
import NameInput from '../InputName';
import { Habilidade } from '../Habilidade';

function SubStandForm({ register, setSpentPoints, subStandPoints, subStandSpentPoints }) {
    const [ attrSpanError, setAttrSpanError ] = useState(false)

    const [ actualValues, setActualValues ] = useState({
        // State para verificação dos atributos atuais (Se aumentou ou diminuiu)
        strengh: 0,
        speed: 0,
        durability: 0,
        precision: 0,
        range: 0,
    });

    // Informações para gerarem os atributos
    const attrInfos = [
        { label: 'Força', id: 'strengh' },
        { label: 'Velocidade', id: 'speed' },
        { label: 'Resistência', id: 'durability' },
        { label: 'Precisão', id: 'precision' },
        { label: 'Alcance', id: 'range' },
    ]

    // Função para quando os atributos mudarem
    const handleAttrChange = e => {
        const { id, value } = e.target;

        Number(value)>actualValues[id]?setSpentPoints(subStandSpentPoints+1):setSpentPoints(subStandSpentPoints-1)
        setActualValues({
            ...actualValues,
            [id]: Number(value),
        })
    }

    // Effect para ativar o erro do span
    useEffect(() => {
        subStandSpentPoints>subStandPoints?setAttrSpanError(true):setAttrSpanError(false)
    }, [subStandSpentPoints, subStandPoints])

    return <>
        <legend>SUBSTAND</legend>
        <fieldset id='sub-stand-basic'>
            <ul className='generic-list'>
                <li>
                    <NameInput {...register('substand.basic.name')}/>
                </li>
                <li>
                    <label htmlFor='subStandType'>Tipo: </label>
                    <select id='subStandType' {...register('substand.basic.standType', { required: true })}>
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
                    <label htmlFor='subStandWeakPoint'>Ponto fraco: </label>
                    <input id='subStandWeakPoint' type="text" {...register('substand.basic.weakPoint')}/>
                </li>
            </ul>
        </fieldset>
        <fieldset id='sub-stand-attributes'>
            <h4>ATRIBUTOS</h4>
            <p>Pontos gastos: <ErrorSpan error={attrSpanError}>{subStandSpentPoints}</ErrorSpan></p>
            <p>Máximo: <span className='points-container'>{subStandPoints}</span></p>
            <ul className='generic-list'>
                {React.Children.toArray(attrInfos.map(
                    props => <li>
                        <label className='sub-stand-label' htmlFor={props.id}>{props.label}</label>
                        <input
                            type="number"
                            min={0}
                            max={5}
                            defaultValue={0}
                            className='sub-stand-attr'
                            id={props.id}
                            {...register(`substand.attributes.${props.id}`, {
                                required: true,
                                valueAsNumber: true,
                                max: 5,
                                min: 0,
                                onChange: handleAttrChange,
                            })}
                        />
                    </li>
                ))}
            </ul>
        </fieldset>
        <fieldset>
            <Habilidade title='Principal' register={register} abName='substand.ability' />
        </fieldset>
    </>;
}

export default SubStandForm;