import React from 'react';

/* CSS */
import './style.scss';

/* COMPONENTS */
import NameInput from '../InputName';


function Habilidade({ title, register, abName }) {
    return <div className='ability'>
        <h4>{title}</h4>
        <NameInput {...register(`${abName}.name`, { required: true })}/>
        <div className='wrapper'>
            <label htmlFor="effect">EFEITO</label>
            <select id='effect' {...register(`${abName}.effect`, { required: true })}>
                <option value="none" defaultChecked>Nenhum</option>
                <option value="burning">Queimar</option>
                <option value="bullet">Projétil</option>
                <option value="slashing">Cortar</option>
                <option value="explosion">Explosivo</option>
                <option value="concussion">Pancada</option>
                <option value="heal">Curar</option>
                <option value="freezing">Congelar</option>
            </select>
        </div>
        <div className='wrapper'>
            <label htmlFor="dice">DADO</label>
            <input type="text" maxLength={5} {...register(`${abName}.dice`, {
                required: true,
                pattern: /\d\w\d\b/,
            })}/>
        </div>
        <textarea id="description" {...register(`${abName}.description`, { required: true })}></textarea>
    </div>;
}

export default Habilidade;