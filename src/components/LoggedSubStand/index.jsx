import React from 'react';

/* COMPONENTS */
import { DoneHab } from '../Habilidade';

function LoggedSubStand({
    subStandState,
    handleAttr,
    handleAttrClick,
    rollDice,
    handleBarrageClick,
}) {
    const letters = '∅EDCBA';

    return <>
        <h2>Sub-stand</h2>
        <ul className='sub-attr-container generic-list infos-container'>
            { React.Children.toArray(Object.keys(subStandState.attributes ?? {}).map(
                attr => <li>
                    <p>{handleAttr(attr)}</p>
                    <input
                        type='text'
                        readOnly
                        className='span-container'
                        defaultValue={letters[subStandState.attributes[attr]]}
                        onClick={e => handleAttrClick(e, 'substand')}
                    />
                </li>
            )) }
        </ul>
        <h2>Batalha</h2>
        <ul className='generic-list infos-container'>
            <li>
                <p>DANO</p>
                <input
                    className='span-container'
                    readOnly
                    defaultValue={`D${subStandState.combat?.damage}`}
                    onClick={rollDice}
                />
            </li>
            <li>
                <p>ARMADURA</p>
                <span className='span-container'>{ subStandState.combat?.shield }</span>
            </li>
            <li>
                <p>BÔNUS</p>
                <span className='span-container'>{ subStandState.combat?.bonus }</span>
            </li>
        </ul>
        <h2>Mov.</h2>
        <ul className='generic-list infos-container'>
            <li>
                <p>ALCANCE</p>
                <span className='span-container'>{ subStandState.move?.range }</span>
            </li>
            <li>
                <p>MOVIMENTO</p>
                <span className='span-container'>{ subStandState.move?.movement }</span>
            </li>
            <li>
                <p>STAND JUMP</p>
                <span className='span-container'>{ subStandState.move?.standJump }</span>
            </li>
        </ul>
        <h2>Habilidade</h2>
        <div className='substand-ability-container'>
            <button className='roll-button' onClick={() => handleBarrageClick('substand')}>BARRAGEM</button>
            <DoneHab title='PRINCIPAL' infos={subStandState.ability} className='substand-done-ability' rollDice={rollDice} />
        </div>
    </>;
}

export default LoggedSubStand;