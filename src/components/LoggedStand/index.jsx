import React from 'react';
import styled from 'styled-components';

/* CSS */
import './style.scss'

/* COMPONENTS */
import LoggedSubStand from '../LoggedSubStand';
import { DoneHab } from '../Habilidade';
const StandContainer = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: 37.5% 37.5% auto;
    grid-template-rows: 20vh auto auto auto auto;
    grid-template-areas:
        "basic basic ."
        "attrs attrs substand"
        "batalha movimento substand"
        "hab hab substand"
        "hab hab substand";
    font-family: Arial, Helvetica, sans-serif;

    input {
        text-align: center;
        transition: background-color 0.5s;
        &:hover {
            background-color: #b4b4b4;
            cursor: pointer;
        }
        &:active {
            background-color: #808080;
        }
    }
`;

function LoggedStand({
    standState,
    subStandState,
    setRolling,
    setRollConfigs,
}) {
    const letters = '∅EDCBA';

    // Funções de Tradução
    const handleType = standType => {
        const standTypes = {
            'short-range': 'Curto Alcance',
            'long-range': 'Longo Alcance',
            'automatic': 'Automático',
            'independent': 'Independente',
            'colony': 'Colônia',
            'act': 'Ato',
            'object': 'Objeto',
            'union': 'União',
            'ability': 'Habilidade',
            'sharing': 'Compartilhado',
        };

        return standTypes[standType];
    }
    const handleHabTitle = title => {
        const titles = {
            firstMain: 'PRINCIPAL',
            secondMain: 'SECUNDÁRIA',
            passive: 'PASSIVA'
        };

        return titles[title];
    }
    const handleAttr = attrName => {
        const attributes = {
            strengh: 'FORÇA',
            speed: 'VELOCIDADE',
            durability: 'DURABILIDADE',
            precision: 'PRECISÃO',
            range: 'ALCANCE',
            development: 'P.D'
        }
        return attributes[attrName];
    }

    // Funções da Rolagem
    const handleAttrClick = (e, wich) => {
        const { value } = e.target;
        
        const facesNumber = x => Math.floor(x**2/2 - 3*x + 6) - 1;
        const times = letters.indexOf(value)>0?facesNumber(letters.indexOf(value))+1:0;

        setRolling(true);
        setRollConfigs({
            faces: 20,
            times: times,
            bonus: wich==='stand'?standState.combat.bonus:subStandState.combat.bonus,
            advantage: letters.indexOf(value) > 3,
            disadvantage: letters.indexOf(value) < 3
        });
    }
    const rollDice = e => {
        const [ times, face ] = e.target.value.split('D');
        setRolling(true);
        setRollConfigs({
            faces: Number(face),
            times: times===''?1:Number(times),
        })
    }

    // const substand = {
    //     basic: {
    //         name: 'HEE HEE',
    //         standType: 'short-range',
    //         weakPoint: 'Nenhum',
    //     },
    //     attributes: {
    //         strengh: 5,
    //         speed: 4,
    //         durability: 3,
    //         precision: 2,
    //         range: 1,
    //         development: 5
    //     },
    //     ability: {
    //         name: 'Healing Power',
    //         effect: 'heal',
    //         dice: '2D10',
    //         description: 'sadflkdjs dçlsjfsldçkfj lfd slkçjsd lçkj',
    //     },
    //     combat: {
    //         damage: 20,
    //         shield: 7,
    //         bonus: 1
    //     },
    //     move: {
    //         range: '10m',
    //         apr: 3,
    //         movement: '20m',
    //         standJump: '40m'
    //     },
    // }

    return <StandContainer>
        <div id="basic-area">
            <h1 id="name">{standState.basic?.name}</h1>
            <ul className="generic-list infos-container">
                <li>Tipo: <strong>{handleType(standState.basic?.standType)}</strong></li>
                <li>Ponto Fraco: <strong>{standState.basic?.weakPoint}</strong></li>
            </ul>
        </div>
        <div id="attributes-area">
            <div className='attr-container'>
                <h3>ATRIBUTOS</h3>
                <ul className='generic-list'>
                    {React.Children.toArray(
                        Object.keys(standState?.attributes).map(props => <li className="attribute">
                            <label htmlFor={props}>{props}</label>
                            <input
                                type='text'
                                className='attribute'
                                readOnly
                                // onClick={handleAttrClick}
                                defaultValue={letters[standState.attributes[props]]}
                                id={props}
                                onClick={e => handleAttrClick(e, 'stand')}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div id="substand-area">
            { !subStandState && <LoggedSubStand
                handleAttr={handleAttr}
                subStandState={subStandState}
                rollDice={rollDice}
                handleAttrClick={handleAttrClick}
            /> }
        </div>
        <div id="battle-area">
            <h2>Batalha</h2>
            <div className='battle-container infos-container'>
                <div>
                    <p>DANO</p>
                    <input
                        className='span-container'
                        onClick={rollDice}
                        readOnly
                        defaultValue={`D${standState.combat?.damage}`}
                    />
                </div>
                <div>
                    <p>ARMADURA</p>
                    <span className='span-container'>{ standState.combat?.shield }</span>
                </div>
                <div>
                    <p>BÔNUS</p>
                    <span className='span-container'>{ standState.combat?.bonus }</span>
                </div>
            </div>
        </div>
        <div id="moviment-area">
            <h2>Movimento</h2>
            <div className='moviment-container infos-container'>
                <div>
                    <p>ALCANCE</p>
                    <span className='span-container'>{ standState.move?.range }</span>
                </div>
                <div>
                    <p>APR</p>
                    <span className='span-container'>{ standState.move?.apr }</span>
                </div>
                <div>
                    <p>MOVIMENTO</p>
                    <span className='span-container'>{ standState.move?.movement }</span>
                </div>
            </div>
        </div>
        <div id="abilitys-area">
            <h2>Habilidades</h2>
            <div className='stand-jump'>
                <p>STAND JUMP</p>
                <span className='span-container'>{ standState.move?.standJump }</span>
            </div>
            <button className='roll-button'>BARRAGEM</button>
            <div className='abilitys'>
                {React.Children.toArray(Object.keys(standState.abilitys ?? {}).map(
                    name => <DoneHab title={handleHabTitle(name)} infos={standState.attributes[name]} rollDice={rollDice} />
                ))}
            </div>
        </div>
    </StandContainer>;
}

export default LoggedStand;