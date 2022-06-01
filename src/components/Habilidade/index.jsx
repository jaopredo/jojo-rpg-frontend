import React from 'react';
import styled from 'styled-components';

/* CSS */
import './style.scss';

/* COMPONENTS */
const NameInput = styled.input`
    border-bottom: 1px solid #adadad;
    font-size: 1.7em;
    color: #494949;
    outline: none;
    text-align: center;
`;

function Habilidade({ title, register }) {
    return <div className='ability'>
        <h4>{title}</h4>
        <NameInput/>
        <div className='wrapper'>
            <label htmlFor="effect">EFEITO</label>
            <select id='effect'>
                <option value="none" defaultChecked>Nenhum</option>
                <option value="burning">Queimar</option>
                <option value="bullet">Projétil</option>
                <option value="slashing">Cortar</option>
                <option value="explosion">Explosivo</option>
                <option value="concussion">Pancada</option>
                <option value="heal">Curar</option>
            </select>
        </div>
        <div className='wrapper'>
            <label htmlFor="dice">DADO</label>
            <input type="text" maxLength={5} pattern='/\d\w\d\b/'/>
        </div>
        <textarea id="description"></textarea>
    </div>;
}

export default Habilidade;