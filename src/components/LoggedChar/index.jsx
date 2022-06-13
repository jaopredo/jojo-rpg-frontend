import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import './style.scss';

/* COLORS */
import colors from '../../modules/colors';

/* ICONS */
import { GoVerified } from 'react-icons/go';


const CharContainer = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: 37.5% 37.5% auto;
    grid-template-rows: 20vh auto auto auto auto;
    grid-template-areas:
        "basic basic ."
        "attrs attrs specs"
        "saude movimento specs"
        "defesa reacoes specs"
        "nivel dados specs";
    font-family: Arial, Helvetica, sans-serif;
`;


const LevelSpan = styled.span`
    background: ${colors.levelColor};
    text-shadow: 3px 3px 5px #00000068;
`;

const MaxLife = styled.div`
    top: 0;
    height: 30px;
    width: 100%;
    background: ${colors.errorColor};
`;
const ActualLifeContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    background: ${colors.lifeColor};
`;
const ActualMentalEnergyContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    background: ${colors.mentalEnergyColor};
`;

const MaxXp = styled.div`
    height: 30px;
    width: 100%;
    background: ${colors.levelContainerColor};
`;
const ActualXpContainer = styled.div`
    height: 30px;
    width: 100%;
    background-color: ${colors.levelColor};
    position: absolute;
    top: 0;
    left: 0;
`;

function LoggedChar({
    charState,  // Objeto com as inforamções do personagem
    actualLife,  // State vida atual
    setActualLife,  // Setar vida atual
    actualMentalEnergy,  // Energia Mental atual
    setActualMentalEnergy,  // Setar energia mental atual
    actualDA,  // DA atual
    setActualDA,  // Setar DA atual
    actualXP,
    setActualXP,
    setRolling,
    setRollingText,
    setRollConfigs,
}) {
    // Refs
    const lifeInputRef = useRef();
    const mentalEnergyInputRef = useRef();
    const actualXPInputRef = useRef();

    useEffect(() => {
        let percentage;
        // Área da vida
        if (actualLife) lifeInputRef.current.value = actualLife;
        percentage = (actualLife/charState.combat?.life) * 100;
        percentage = percentage<0?0:percentage>100?100:percentage;
        document.getElementById('actual-life').style.width = `${percentage}%`;

        // Área da energia mental
        if (actualMentalEnergy) mentalEnergyInputRef.current.value = actualMentalEnergy;
        percentage = (actualMentalEnergy/charState.combat?.mentalEnergy) * 100;
        percentage = percentage<0?0:percentage>100?100:percentage;
        document.getElementById('actual-mental-energy').style.width = `${percentage}%`;

        // Área xp
        if (actualXP) actualXPInputRef.current.value = actualXP;
        percentage = (actualXP/charState.level?.maxXP) * 100;
        percentage = percentage<0?0:percentage>100?100:percentage;
        document.getElementById('actual-xp').style.width = `${percentage}%`;
    }, [ actualLife, actualMentalEnergy, actualXP ])

    /* FUNÇÕES DE ADICIONAR E REMOVER */
    const handleHealthKeyDown = (e, action) => {
        const { value } = e.target;
        if (e.key === 'Enter') {
            if (!Number(e.target.value)) return;
            if (value[0] === '+' || value[0] === '-') {
                if (action === 'life') setActualLife(actualLife + Number(value));
                if (action === 'mental-energy') setActualMentalEnergy(actualMentalEnergy + Number(value));
                return;
            }
            if (action === 'life') setActualLife(Number(value));
            if (action === 'mental-energy') setActualMentalEnergy(Number(value));
            return;
        }
        if (e.key === 'ArrowUp') {
            if (action === 'life') setActualLife(actualLife+1);
            if (action === 'mental-energy') setActualMentalEnergy(actualMentalEnergy+1);
        }
        if (e.key === 'ArrowDown') {
            if (action === 'life') setActualLife(actualLife-1);
            if (action === 'mental-energy') setActualMentalEnergy(actualMentalEnergy-1);
        }
    }
    const handleDodgeChange = e => {
        const { dodge } = charState.specialitys?.dexterity;
        const { reflex } = charState.specialitys?.vigillance;

        if (e.target.checked) {
            setActualDA(actualDA + 3 + Number(dodge)*5 + Number(reflex)*5);
            return;
        }
        setActualDA(charState.combat?.da)
    }
    const handleXPChange = e => {
        const { value } = e.target;
        if (e.key === 'Enter') {
            if(!Number(value)) return;
            if (value[0] === '+' || value[0] === '-') {
                setActualXP(actualXP + Number(value));
                return;
            };
            setActualXP(Number(value))
        }
        if (e.key === 'ArrowUp') setActualXP(actualXP+1)
        if (e.key === 'ArrowDown') setActualXP(actualXP-1)
    }

    /* FAZER AS ROLAGENS */
    const handleAttrClick = e => {
        const { value, id } = e.target;
        setRolling(true)
        setRollingText(<>
            { id.toUpperCase() } ROLL
        </>)
        setRollConfigs({
            faces: 20,
            times: Math.floor(Number(value) / 3)+1,
            advantage: true,
        })
    }
    const handleSpecClick = (e, have, area) => {
        // Se eu tiver a especialidade
        if (have) {
            setRolling(true)
            setRollingText('')
            setRollConfigs({
                faces: 20,  // Dado de 20 faces
                // Mesma quantidade de vezes do atributo
                times: Math.floor(Number(charState.attributes[area] / 3))+1,
                bonus: 5,
                // Vantagem ativada
                advantage: true,
            })
        }
    }

    /* TRADUZ A RAÇA QUE VEM DA DATABASE :) */
    const handleRace = (race) => {
        const translate = {
            human: 'HUMANO',
            vampire: 'VAMPÍRO',
            rockman: 'HOMEM PEDRA',
            alien: 'ALIENÍGENA',
        };

        return translate[race];
    }

    // Informações das especialidades
    const specsInfos = {
        strengh: [
            { id: 'athletics', label: 'Atletismo', area: 'strengh' },
            { id: 'mindResistence', label: 'Resistência Psicológica', area: 'strengh' },
            { id: 'jump', label: 'Salto', area: 'strengh' },
            { id: 'fight', label: 'Briga', area: 'strengh' },
            { id: 'climb', label: 'Escalar', area: 'strengh' },
        ],

        dexterity: [
            { id: 'acrobacy', label: 'Acrobacia', area: 'dexterity' },
            { id: 'stealth', label: 'Furtividade', area: 'dexterity' },
            { id: 'aim', label: 'Mira', area: 'dexterity' },
            { id: 'dodge', label: 'Esquiva', area: 'dexterity' },
        ],

        constituition: [
            { id: 'force', label: 'Vigor', area: 'constituition' },
            { id: 'imunity', label: 'Imunidade', area: 'constituition' },
            { id: 'painResistence', label: 'Resistência a Dor', area: 'constituition' },
        ],

        education: [
            { id: 'history', label: 'História', area: 'education' },
            { id: 'geography', label: 'Geografia', area: 'education' },
            { id: 'math', label: 'Matemática', area: 'education' },
            { id: 'investigation', label: 'Investigação', area: 'education' },
            { id: 'forensic', label: 'Forense', area: 'education' },
            { id: 'sociology', label: 'Sociologia', area: 'education' },
            { id: 'tecnology', label: 'T.I', area: 'education' },
            { id: 'art', label: 'Arte', area: 'education' },
            { id: 'physics', label: 'Física', area: 'education' },
            { id: 'chemistry', label: 'Química', area: 'education' },
            { id: 'foreignLanguage', label: 'Língua Estrangeira', area: 'education' },
            { id: 'programming', label: 'Programação', area: 'education' },
            { id: 'policy', label: 'Política', area: 'education' },
            { id: 'religion', label: 'Religião', area: 'education' },
            { id: 'mechanic', label: 'Mecânico', area: 'education' },
            { id: 'biology', label: 'Biologia', area: 'education' },
        ],

        vigillance: [
            { id: 'reflex', label: 'Reflexo', area: 'vigillance' },
            { id: 'perception', label: 'Percepção', area: 'vigillance' },
            { id: 'insight', label: 'Intuição', area: 'vigillance' },
        ],

        commonSense: [
            { id: 'computer', label: 'Usar Computador', area: 'commonSense' },
            { id: 'medicine', label: 'Medicina', area: 'commonSense' },
            { id: 'bribery', label: 'Suborno', area: 'commonSense' },
            { id: 'survival', label: 'Sobrevivência', area: 'commonSense' },
            { id: 'break', label: 'Arrombar', area: 'commonSense' },
            { id: 'cooking', label: 'Cozinhar', area: 'commonSense' },
            { id: 'firstAid', label: 'Primeiros-socorros', area: 'commonSense' },
            { id: 'drive', label: 'Dirigir', area: 'commonSense' },
        ],

        charisma: [
            { id: 'intimidation', label: 'Intimidação', area: 'charisma' },
            { id: 'cheating', label: 'Enganação', area: 'charisma' },
            { id: 'acting', label: 'Atuação', area: 'charisma' },
            { id: 'charm', label: 'Charme', area: 'charisma' },
            { id: 'sexy', label: 'Seduzir', area: 'charisma' },
            { id: 'persuasion', label: 'Persuasão', area: 'charisma' },
        ]
    };

    return <CharContainer>
        <div id="basic-area">
            <h1 id="name">{charState.basic?.name}</h1>
            <ul className="generic-list infos-container">
                <li>Raça: <strong>{handleRace(charState.basic?.race)}</strong></li>
                <li>Idade: <strong>{charState.basic?.age}</strong></li>
                <li>Profissão: <strong>{charState.basic?.occupation}</strong></li>
            </ul>
        </div>
        <div id="attributes-area">
            <div className='attr-container'>
                <h3>ATRIBUTOS</h3>
                <ul className='generic-list'>
                    {React.Children.toArray(
                        charState.attributes?
                            Object.keys(charState.attributes).map(props => <li className="attribute">
                                <label htmlFor={props}>{props}</label>
                                <input
                                    type='number'
                                    className='attribute'
                                    readOnly
                                    min={1}
                                    max={10}
                                    onClick={handleAttrClick}
                                    defaultValue={charState.attributes[props]}
                                    id={props}
                                />
                            </li>):''
                    )}
                </ul>
            </div>
        </div>
        <div id="specialitys-area">
            <h2>Especialidades</h2>
            <table>
                <thead>
                    <tr><th>Nome</th><th>Check</th></tr>
                </thead>
                {React.Children.toArray(Object.keys(specsInfos).map(
                    area => <tbody className={`${area}-container`}>
                        {React.Children.toArray(specsInfos[area].map(props => 
                        <tr className={
                            `${props.area} ${charState.specialitys?.[area][props.id]&&'have-spec'}`
                        } onClick={e => handleSpecClick(e, !!charState.specialitys?.[area][props.id], area)}>
                            <td>{props.label}</td>
                            <td><GoVerified style={{
                                    opacity: Number(!!charState.specialitys?.[area][props.id])
                                }}/></td>
                        </tr>
                        ))}
                    </tbody>
                ))}
            </table>
        </div>
        <div id="health-area">
            <h2>Saúde</h2>
            <div id="life">
                <h3>VIDA</h3>
                <div className='health-container'>
                    <MaxLife/>
                    <ActualLifeContainer id='actual-life'/>
                    <p>
                        <input
                            type="text"
                            defaultValue={actualLife}
                            onKeyUp={e => handleHealthKeyDown(e, 'life')}
                            ref={lifeInputRef}
                            onBlur={e => e.target.value = actualLife}
                        />  / {charState.combat?.life}
                    </p>
                </div>
            </div>
            <div id="mental-energy">
                <h3>ENERGIA MENTAL</h3>
                <div className='health-container'>
                    <MaxXp/>
                    <ActualMentalEnergyContainer id='actual-mental-energy'/>
                    <p>
                        <input
                            type="text"
                            defaultValue={actualMentalEnergy}
                            onKeyUp={e => handleHealthKeyDown(e, 'mental-energy')}
                            ref={mentalEnergyInputRef}
                            onBlur={e => e.target.value = actualMentalEnergy}
                            maxLength={3}
                        /> / {charState.combat?.mentalEnergy}
                    </p>
                </div>
            </div>
        </div>
        <div id="moviment-area">
            <h2>Mov.</h2>
            <p className='char-move'>{charState.combat?.movement}m</p>
        </div>
        <div id="defend-area">
            <h2>Defesa</h2>
            <div className="defend-container">
                <div id="ca-area">
                    <div>DA<span className="span-container">{actualDA}</span></div>
                    <div>
                        <input type="checkbox" id="dodge-check" onChange={handleDodgeChange} />
                        <label htmlFor="dodge-check">ESQUIVA</label>
                    </div>
                </div>
                <div id="shield-area">
                    <label htmlFor="shield">ARMADURA</label><input
                        className="span-container"
                        type='number'
                        defaultValue={charState.combat?.shield}
                    />
                </div>
            </div>
        </div>
        <div id="reactions-area">
            <h2>Reações</h2>
            <div className="reactions-container">
                <button className="roll-button" onClick={e => {
                    setRolling(true)
                    setRollingText('CONTRA-ATAQUE')
                    setRollConfigs({
                        faces: 20,
                        times: 1,
                        bonus: charState.specialitys.strengh.fight && 5,
                    })
                }}>CONTRA-ATAQUE</button>
                <button className="roll-button" onClick={e => {
                    setRolling(true)
                    setRollingText('CONTRA-ATAQUE')
                    setRollConfigs({
                        faces: 20,
                        times: 1,
                        bonus: (charState.specialitys.strengh.fight && 5) + (charState.specialitys.vigillance.reflex && 5),
                    })
                }}>BLOQUEAR</button>
                <button className="roll-button" onClick={e => {
                    setRolling(true)
                    setRollingText('CONTRA-ATAQUE')
                    setRollConfigs({
                        faces: 4,
                        times: 1,
                        bonus: charState.specialitys.strengh.fight && 5,
                    })
                }}>SOCO</button>
            </div>
        </div>
        <div id="level-area">
            <h2>Level</h2>
            <LevelSpan className="level-number-container">{charState.level?.actualLevel}</LevelSpan>
            <div id='level-container'>
                <MaxXp/>
                <ActualXpContainer id='actual-xp'/>
                <div id="level-xp">
                    <input
                        type='text'
                        defaultValue={actualXP}
                        ref={actualXPInputRef}
                        onBlur={e => e.target.value = actualXP}
                        onKeyUp={handleXPChange}
                        maxLength={4}
                        id='actual-level'
                    />/{charState.level?.maxXP}
                </div>
            </div>
        </div>
        <div id="dices-area"></div>
    </CharContainer>;
}

export default LoggedChar;