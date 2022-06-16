import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from 'react-cookie';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

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

function NewItemForm({ setShowNewItem, setInventoryState }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            quantity: 0,
            weapon: false,
            details: '',
            damage: '',
            critic: '',
            tipo: '',
            range: '',
            effects: {
                burning: false,
                bullet: false,
                slashing: false,
                explosion: false,
                concussion: false,
                heal: false,
            }
        }
    });

    const onSubmit = data => {
        const token = new Cookies().get('token');
        axios.put(`${process.env.REACT_APP_API_URL}/inventory/item`, data, {
            headers: {
                authorization: `JOJO ${token}`
            }
        }).then(resp => setInventoryState(resp.data)).catch(err => { if(err) console.log(err) })
    }

    return <form className='new-item-form' onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder='Nome' {...register('name', {
            required: true
        })} />
        <textarea placeholder='Descrição' {...register('details', {
            required: true
        })}></textarea>
        <div>
            <label htmlFor="quantity">Espaços: </label><input
                id='quantity'
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
            <Buttons type='button' className='button-new-item' onClick={e => setShowNewItem(false)}><AiFillCloseCircle /></Buttons>
        </div>
    </form>;
};

export default NewItemForm;