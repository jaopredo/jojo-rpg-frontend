import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

/* ICONS */
import { GoVerified } from 'react-icons/go';

/* CSS */
import '../sass/logged.scss';

function Logged({ action, cookies, setCookie }) {
    let temporaryToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWU4ZmQ0Yzc1MWZlNWFmYTYwNGI3ZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiYWNjZXNzIjoicGxheWVyIiwiaWF0IjoxNjU0NTU4Njc2LCJleHAiOjE2ODYxMTg2NzZ9.XDpnChis6OkTK_P43mwHaDVzV01c0OzY6WBVGejrsEY";

    const [ charState, setCharState ] = useState({});
    const [ standState, setStandState ] = useState({});
    const [ subStandState, setSubStandState ] = useState({});

    const [ actualLife, setActualLife ] = useState();
    const [ actualMentalEnergy, setActualMentalEnergy ] = useState();

    useEffect(() => {
        // if (action ==='creating') {
        //     axios.post(`${process.env.REACT_APP_API_URL}/player/register`, {
        //         email: cookies.email,
        //         password: cookies.password,
        //         character: cookies.character,
        //         stand: cookies.stand,
        //         substand: cookies.substand
        //     }).then(resp => {
        //         console.log(resp.data)
        //         setCookie('token', resp.data.token)
        //         setCookie('character', resp.data.character)
        //         setCookie('stand', resp.data.stand)
        //         setCookie('substand', resp.data.substand?resp.data.substand:undefined)
        //     })
        // }
        // if (action === 'login') {
            
        // }

        /* Setando os valores do PERSONAGEM */
        axios.get(`${process.env.REACT_APP_API_URL}/character`, {
            headers: {
                authorization: `JOJO ${temporaryToken}`
            }
        }).then(resp => {
            setCharState(resp.data)
            if (!actualLife && !actualMentalEnergy) {
                setActualLife(charState.combat?.life)
                setActualMentalEnergy(charState.combat?.mentalEnergy)
            }
        }).catch(err => {
            if (err) console.log(err)
        })

        /* Setando os valores do STAND */
        axios.get(`${process.env.REACT_APP_API_URL}/stand`, {
            headers: {
                authorization: `JOJO ${temporaryToken}`
            }
        }).then(resp => {
            setStandState(resp.data)
        }).catch(err => {
            if (err) console.log(err)
        })
    })


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

    /* FUNÇÕES DE ADICIONAR E REMOVER */
    const handleLifeClick = e => {
    }

    const handleRace = (race) => {
        const translate = {
            human: 'HUMANO',
            vampire: 'VAMPÍRO',
            rockman: 'HOMEM PEDRA',
            alien: 'ALIENÍGENA',
        };

        return translate[race];
    }

    return <div className="general-container">
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
                <p>{actualLife} / {charState.combat?.life}</p>
            </div>
            <div id="mental-energy">
                <h3>ENERGIA MENTAL</h3>
                <p>{actualMentalEnergy} / {charState.combat?.mentalEnergy}</p>
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
                    <div><label htmlFor="ca">DA</label><span className="span-container">{charState.combat?.da}</span></div>
                    <div><input type="checkbox" id="dodge-check" /><label htmlFor="dodge-check">ESQUIVA</label></div>
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
            <button>CONTRA-ATAQUE</button>
            <button>BLOQUEAR</button>
            <button>SOCO</button>
        </div>
        <div id="level-area">
            <h2>Level</h2>
            <span className="level-number-container">{charState.level?.actualLevel}</span>
            <div className="level-container">
                <div className="max-xp"></div>
                <div className="actual-xp"></div>
                <p>{charState.level?.actualXP}/{charState.level?.maxXP}</p>
            </div>
        </div>
        <div id="dices-area"></div>
        <button style={{ position: 'absolute', top: 0, left: 0 }} onClick={e => {
            console.log(charState)
        }}>CLIQUE</button>
    </div>;
}

export default Logged;