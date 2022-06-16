import React from 'react';

/* CSS */
import './style.scss';

/* COMPONENTS */
import NameInput from '../InputName';

export function Habilidade({ title, register, abName }) {
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
            })}/>
        </div>
        <textarea id="description" {...register(`${abName}.description`, { required: true })}></textarea>
    </div>;
}

export function DoneHab({ title, infos, className, rollDice }) {
    const handleEffect = effect => {
        const effects = {
            none: 'Nenhum',
            burning: 'Queimar',
            bullet: 'Projétil',
            slashing: 'Cortar',
            explosion: 'Explosivo',
            concussion: 'Pancada',
            heal: 'Curar',
            freezing: 'Congelar',
        }

        return effects[effect];
    }

    return <div className={`done-ability ${className}`}>
        <h4>{title}</h4>
        <h5>{infos?.name}</h5>
        <div className='wrapper'>
            <p>EFEITO</p>
            <span className='hab-info'>{ handleEffect(infos?.effect) }</span>
        </div>
        <div className='wrapper'>
            <p>DADO</p>
            <input
                className='hab-info'
                defaultValue={infos?.dice}
                readOnly
                onClick={rollDice}
            />
        </div>
        <p className='description'>{infos?.description}</p>
    </div>;
}