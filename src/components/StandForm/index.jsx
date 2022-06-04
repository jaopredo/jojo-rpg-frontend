import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/* CSS */
import './style.scss';

/* COMPONENTS */
import { ErrorSpan, ScreenError } from '../Messages';
import Habilidade from '../Habilidade';
import SubStandForm from '../SubStandForm';


function StandForm({ setStandState, setSubStandState }) {
    const navigate = useNavigate();
    const [ spentPoints, setSpentPoints ] = useState(0);  // Pontos gastos nos atributos
    const [ attrSpanError, setAttrSpanError ] = useState(false);  // True ou False para erro de atributos passando do limite
    const [actualAttrValues, setActualAttrValues] = useState({
        // Valores atuais para comparar se aumentou ou diminuiu
        strengh: 0,
        speed: 0,
        durability: 0,
        precision: 0,
        range: 0,
        development: 0,
    })
    const standAttrPoints = 20  // Máximo de pontos permitido

    const [ subStandSpentPoints, setSubStandSpentPoints ] = useState(0);
    const subStandPoints = 14;

    // Valores para animação da validação
    const [scrErrMsg, setScrErrMsg] = useState('');
    const [isScrErr, setIsScrErr] = useState(false);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        // Se os gastos forem maiores q o permitido, setar erro para TRUE, se não, para FALSE
        spentPoints>standAttrPoints?setAttrSpanError(true):setAttrSpanError(false)
    }, [spentPoints])

    const handleAttrChange = function(e) {
        const { value, id } = e.target;

        // Checando se aumentou ou diminuiu
        Number(value) > actualAttrValues[id]?setSpentPoints(spentPoints+1):setSpentPoints(spentPoints-1);

        setActualAttrValues({  // Alterando o objeto com os valores atuais
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
    ]

    const pdAbilitys = [
        {},
        { passive: true },
        { firstMain: true },
        { firstMain: true, secondMain: true },
        { firstMain: true, secondMain: true, passive: true },
        { firstMain: true, secondMain: true, passive: true, substand: true },
    ];
    const [ abilitys, setAbilitys ] = useState(pdAbilitys[0]);

    // Alterando as habilidades
    const handlePDChange = e => {
        const { value } = e.target;
        setAbilitys(pdAbilitys[value]);
    }

    const onSubmit = data => {
        const { stand, substand } = data;

        for (let abilityName in stand.abilitys) {  // Removendo habilidades não presentes
            if (!Object.keys(abilitys).includes(abilityName)) stand.abilitys[abilityName] = undefined;
        }

        if (spentPoints > standAttrPoints || subStandSpentPoints > subStandPoints) {
            setScrErrMsg('Você gastou mais pontos do que o permitido!');
            setIsScrErr(true);
            return;
        }
        if (spentPoints > 0 || subStandSpentPoints > 0) {
            setScrErrMsg('Você não gastou todos os seus pontos!');
            setIsScrErr(true);
            return;
        }

        setStandState(stand);
        if (substand) setSubStandState(substand);
        navigate('/logged')
    }

    return <form className='stand-register' onSubmit={handleSubmit(onSubmit)}>
        <fieldset id='basic-fieldset'>
            <ul className='generic-list'>
                <li>
                    <input type='text' className='name' {...register('stand.basic.name', { required: true })} />
                </li>
                <li>
                    <label htmlFor='standType'>Tipo: </label>
                    <select id='standType' {...register('stand.basic.standType', { required: true })}>
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
                    <input id='weakPoint' type="text" {...register('stand.basic.weakPoint')}/>
                    <p className='warning'>5: A, 4: B, 3: C, 2: D, 1: E, 0: Nulo</p>
                </li>
            </ul>
        </fieldset>
        <fieldset id='attr-fieldset' className='stand-attr'>
            <p>Pontos Gastos <ErrorSpan error={attrSpanError} className='gasto-container'>{spentPoints}</ErrorSpan></p>
            <p>Máximo <span className='points-container'>{standAttrPoints}</span></p>

            <div className='attr-container'>
                <h3>ATRIBUTOS</h3>
                <ul className='generic-list'>
                    {React.Children.toArray(attrInputInfos.map(props => <li>
                        <label htmlFor={props.id}>{props.label}</label>
                        <input
                            type='number'
                            className='attribute'
                            min={0}
                            max={5}
                            defaultValue={0}
                            id={props.id}
                            {...register(`stand.attributes.${props.id}`, {
                                required: true,
                                valueAsNumber: true,
                                max: 5,
                                min: 0,
                                onChange: handleAttrChange,
                            })}
                        />
                    </li>
                    ))}
                    <li>
                        <label htmlFor="pd">P.D</label>
                        <input
                            type="number"
                            className='attribute'
                            min={0}
                            max={5}
                            defaultValue={0}
                            id='development'
                            {...register('stand.attributes.development', {
                                required: true,
                                valueAsNumber: true,
                                max: 5,
                                min: 0,
                                onChange: e => {
                                    handleAttrChange(e);
                                    handlePDChange(e);
                                }
                            })}
                        />
                    </li>
                </ul>
            </div>
        </fieldset>
        <fieldset id='substand-fieldset'>
            { abilitys.substand && <SubStandForm
                register={register}
                setSpentPoints={setSubStandSpentPoints}
                subStandPoints={subStandPoints}
                subStandSpentPoints={subStandSpentPoints}
            /> }
        </fieldset>
        <fieldset id='abilitys-fieldset'>
            {
                abilitys.firstMain && <Habilidade
                    title='Principal'
                    register={register}
                    abName='stand.abilitys.firstMain'
                />
            }
            {
                abilitys.secondMain && <Habilidade
                    title='Secundário'
                    register={register}
                    abName='stand.abilitys.secondMain'
                />
            }
            {
                abilitys.passive && <Habilidade
                    title='Passiva'
                    register={register}
                    abName='stand.abilitys.passive'
                />
            }
        </fieldset>
        <div className='button-container'>
            <button type='submit'>ENVIAR</button>
            {isScrErr&&<ScreenError error={isScrErr}>{scrErrMsg}</ScreenError>}
        </div>
    </form>;
}

export default StandForm;