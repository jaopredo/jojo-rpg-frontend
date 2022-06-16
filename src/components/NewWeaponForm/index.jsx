import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Cookies } from 'react-cookie';

/* CSS */
import './style.scss';
const Buttons = styled.button`
    background: #00000000;
    border: none;
    font-size: 2vw !important;

    &:hover {
        cursor: pointer;
        transform: none;
        background: #00000000;
    }
`;

function NewWeaponForm({ setShowNewWeapon, setInventoryState }) {
    const { register, handleSubmit } = useForm({ defaultValues: {
        weapon: true,
        effects: {
            burning: false,
            bullet: false,
            slashing: false,
            explosion: false,
            concussion: false,
            heal: false,
        }
    } });

    const [ diceNotReadable, setDiceNotReadable ] = useState(false);
    const [ diceValue, setDiceValue ] = useState();
    const dicesTypes = {
        machineGun: '2D10',
        pistol: '1D8',
        shotgun: '4D8',
        rifle: '2D12',
        sniper: '2D20',
        grenade: '4D6',
        body: '1D6',
    };

    const onSubmit = data => {
        const token = new Cookies().get('token');
        axios.put(`${process.env.REACT_APP_API_URL}/inventory/item`, data, {
            headers: {
                authorization: `JOJO ${token}`
            }
        }).then(resp => setInventoryState(resp.data)).catch(err => { if(err) console.log(err) })
    }

    const handleTypeChange = e => {
        const { value } = e.target;
        if (value === 'custom') {
            setDiceNotReadable(false);
            return;
        };
        setDiceValue(dicesTypes[value])
        setDiceNotReadable(true);
    }

    useEffect(() => {
        document.getElementById('weapon-damage').value = diceValue ?? '';
    }, [diceValue])

    return <form className='new-item-form new-weapon' onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Nome' {...register('name', {
            required: true
        })} />
        <div>
            <label htmlFor="weaponType">Tipo: </label>
            <select type="text" {...register('tipo', {
                required: true,
                onChange: handleTypeChange
            })}>
                <option value="custom" defaultChecked>Personalizado</option>
                <option value="machineGun">Metralhadora</option>
                <option value="pistol">Pistolas</option>
                <option value="shotgun">Shotguns</option>
                <option value="rifle">Rifles</option>
                <option value="sniper">Snipers</option>
                <option value="grenade">Granada</option>
                <option value="body">Arma Branca</option>
            </select>
        </div>
        <div>
            <label htmlFor="weapon-damage">Dado: </label>
            <input type="text" readOnly={diceNotReadable} id='weapon-damage' placeholder='2D20' {...register('damage', {
                required: true
            })} />
        </div>
        <div>
            <label htmlFor="weapon-critic">Crítico: </label>
            <input type="number" min={0} id='weapon-critic' placeholder='+1' {...register('critic', {
                required: true,
                valueAsNumber: true,
                min: 0,
            })} />
        </div>
        <div>
            <label htmlFor="weapon-range">Alcance: </label>
            <input type="number" min={0} id='weapon-range' placeholder='+1' {...register('range', {
                required: true,
                valueAsNumber: true,
                min: 0,
            })} />
        </div>
        <textarea placeholder='Descrição' {...register('details', {
            required: true
        })}></textarea>
        <div>
            <label htmlFor="weapon-quantity">Espaços: </label><input
                id='weapon-quantity'
                type="number"
                min={0}
                {...register('quantity', {
                    required: true,
                    valueAsNumber: true,
                    min: 0
                })} />
        </div>
        <div className='buttons-container'>
            <Buttons type='submit' className='button-new-item'><BsFillCheckCircleFill/></Buttons>
            <Buttons type='button' className='button-new-item' onClick={e => setShowNewWeapon(false)}><AiFillCloseCircle /></Buttons>
        </div>
    </form>;
}

export default NewWeaponForm;