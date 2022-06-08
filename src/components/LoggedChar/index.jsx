import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

/* COLORS */
import colors from '../../modules/colors';

/* ICONS */
import { GoVerified } from 'react-icons/go';

const LevelSpan = styled.span`
    background: ${colors.levelColor};
    text-shadow: 3px 3px 5px #00000068;
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
}) {
    // Refs
    const lifeInputRef = useRef();
    const mentalEnergyInputRef = useRef();
    const actualXPInputRef = useRef();
    const actualXPContainerRef = useRef();

    useEffect(() => {
        if (actualLife) lifeInputRef.current.value = actualLife;
        if (actualMentalEnergy) mentalEnergyInputRef.current.value = actualMentalEnergy;
        if (actualXP) actualXPInputRef.current.value = actualXP;
    }, [ actualLife, actualMentalEnergy, actualXP ])

    /* FUNÇÕES DE ADICIONAR E REMOVER */
    const handleHealthKeyDown = (e, action) => {
        const { value } = e.target;
        if (e.key === 'Enter') {
            if (action === 'life') setActualLife(actualLife + Number(value));
            if (action === 'mental-energy') setActualMentalEnergy(actualMentalEnergy + Number(value));
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
        if (e.key === 'Enter') setActualXP(actualXP + Number(value));
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

    return <>
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
                                    disabled
                                    min={1}
                                    max={10}
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
                        {React.Children.toArray(specsInfos[area].map(props => <tr className={props.area}>
                            <td>{props.label}</td>
                            <td><GoVerified style={{
                                    opacity: Number(!!charState.specialitys?.[area][props.id])
                                }}/></td>
                        </tr>))}
                    </tbody>
                ))}
            </table>
        </div>
        <div id="health-area">
            <h2>Saúde</h2>
            <div id="life">
                <h3>VIDA</h3>
                <p>
                    <input
                        type="number"
                        defaultValue={actualLife}
                        onKeyUp={e => handleHealthKeyDown(e, 'life')}
                        ref={lifeInputRef}
                        onBlur={e => e.target.value = actualLife}
                        className='span-container'
                    />  / {charState.combat?.life}
                </p>
            </div>
            <div id="mental-energy">
                <h3>ENERGIA MENTAL</h3>
                <p>
                    <input
                        type="number"
                        defaultValue={actualMentalEnergy}
                        onKeyUp={e => handleHealthKeyDown(e, 'mental-energy')}
                        ref={mentalEnergyInputRef}
                        onBlur={e => e.target.value = actualMentalEnergy}
                        maxLength={3}
                        className='span-container'
                    /> / {charState.combat?.mentalEnergy}</p>
            </div>
        </div>
        <div id="moviment-area">
            <h2>Mov.</h2>
            <p>{charState.combat?.movement}m</p>
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
                <button className="reaction">CONTRA-ATAQUE</button>
                <button className="reaction">BLOQUEAR</button>
                <button className="reaction">SOCO</button>
            </div>
        </div>
        <div id="level-area">
            <h2>Level</h2>
            <LevelSpan className="level-number-container">{charState.level?.actualLevel}</LevelSpan>
            <div id='level-container'>
                <MaxXp/>
                <ActualXpContainer ref={actualXPContainerRef}/>
                <div id="level-xp">
                    <input
                        type='number'
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
    </>;
}

export default LoggedChar;