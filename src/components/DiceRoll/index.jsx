import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { MdClose } from 'react-icons/md';

/* CSS */
import './style.scss';

/* COLORS */
import colors from '../../modules/colors';

/* COMPONENTES */
const RollContainer = styled.div`
    background: ${colors.rollColor};
    text-align: center;

    width: 50%;
    height: 50%;
    padding: 20px;

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    color: white;
    
    border-radius: 10px;
    box-shadow: 3px 3px 3px #000000;
    animation: 1s ${keyframes`${fadeIn}`} ;
`;
const RolledValue = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${
        props =>
            props.natMax?colors.lifeColor:props.nat1?colors.errorColor:colors.grayHover
    };
    border: ${
        props => props.maxVal?'3px solid'+colors.lifeColor:
            props.minVal?'3px solid'+colors.errorColor:'none'
    };
    width: 100px;
    height: 100px;
    font-size: 1.9em;
    border-radius: 50%;
`;
const DiceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const handleRollDice = (max) => Math.round(Math.random() * (max - 1) + 1)  // Gera número aleatório

export const DiceRoll = ({ children, setRolling, rollConfigs={
    faces: 6,
    times: 1,
    bonus: 0,
    advantage: false,
    disadvantage: false,
} }) => {
    const rolls = useRef();

    // Armazeno os valores rolados dentro de um ARRAY
    // Também contém informações sobre a rolagem
    rolls.current = [...Array(rollConfigs.times).keys()].map(() => {
        const value = handleRollDice(rollConfigs.faces);
        return {
            value: value + (rollConfigs.bonus??0),  // O valor
            nat1: value===1,  // Se é o valor 1
            originValue: value,  // Valor original
            natMax: value===rollConfigs.faces,  // Se é o valor máximo
            max: false,  // Se é o maior da rolagem
            min: false,
        }
    })

    // Se a vantagem tiver ativada
    if (rollConfigs.advantage) {
        // Pego o maior valor
        const maxValue = Math.max(...rolls.current.map(rollProps => rollProps.value))
        
        rolls.current = rolls.current.map(rollProps => {
            if (rollProps.value === maxValue) rollProps.max = true;
            return rollProps;
        })
    }
    // Se a desvantagem tiver ativada
    if (rollConfigs.disadvantage) {
        // Pego o maior valor
        const minValue = Math.min(...rolls.current.map(rollProps => rollProps.value))
        
        rolls.current = rolls.current.map(rollProps => {
            if (rollProps.value === minValue) rollProps.min = true;
            return rollProps;
        })
    }

    return <RollContainer>
        <MdClose id='close-icon' onClick={() => setRolling(false)}/>
        <h1>RESULTADO DA ROLAGEM</h1>
        { children }
        <div className='content-container'>
            { React.Children.toArray(
                rolls.current?.map(roll => <DiceContainer>
                    <RolledValue
                        natMax={roll.natMax}
                        nat1={roll.nat1}
                        maxVal={roll.max}
                        minVal={roll.min}
                    >{roll.value}</RolledValue>
                    ({roll.originValue} + {rollConfigs.bonus ?? 0})
                </DiceContainer>)
            ) }
        </div>
    </RollContainer>;
}

export const Barragem = ({ setBarrage, barrageConfigs={
    strengh: 1,
    speed: 1,
} }) => {
    const calcDamage = x => 0.5*x + 0.5;

    const [ definitiveRoll, setDefinitiveRoll ] = useState();
    const [ hitPunches, setHitPunches ] = useState();
    useEffect(() => {
        let rolls = [ handleRollDice(6), handleRollDice(6) ]

        setHitPunches(rolls[0] + rolls[1] + barrageConfigs.speed*2)
        //   Valor final       =     1 valor           2 valor
        setDefinitiveRoll(hitPunches * calcDamage(barrageConfigs.strengh));
    }, [hitPunches, barrageConfigs])

    return <RollContainer>
        <MdClose id='close-icon' onClick={() => setBarrage(false)}/>
        <h1>RESULTADO DA BARRAGEM</h1>
        <div className='content-container'>
            <RolledValue>{definitiveRoll}</RolledValue>
        </div>
        <p> SOCOS ACERTADOS</p>
        <p>DANO CAUSADO</p>
    </RollContainer>
}