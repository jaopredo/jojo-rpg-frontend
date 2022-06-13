import React, { useEffect, useState } from "react";
import axios from "axios";

/* CSS */
import '../sass/logged.scss';

/* COMPONENTS */
import LoggedChar from '../components/LoggedChar';
import LoggedStand from "../components/LoggedStand";
import DiceRoll from "../components/DiceRoll";

function Logged({ action, cookies, setCookie }) {
    let temporaryToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWU4ZmQ0Yzc1MWZlNWFmYTYwNGI3ZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiYWNjZXNzIjoicGxheWVyIiwiaWF0IjoxNjU0NTU4Njc2LCJleHAiOjE2ODYxMTg2NzZ9.XDpnChis6OkTK_P43mwHaDVzV01c0OzY6WBVGejrsEY";

    const [ charState, setCharState ] = useState({});
    const [ standState, setStandState ] = useState({});
    const [ subStandState, setSubStandState ] = useState({});

    const [ rolling, setRolling ] = useState(false);
    const [ rollingText, setRollingText ] = useState('');
    const [ rollConfigs, setRollConfigs ] = useState({});

    const [ actualLife, setActualLife ] = useState();
    const [ actualMentalEnergy, setActualMentalEnergy ] = useState();
    const [ actualDA, setActualDA ] = useState();
    const [ actualXP, setActualXP ] = useState();

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
            if (!actualLife || !actualMentalEnergy) {
                setActualLife(charState.combat?.life);
                setActualMentalEnergy(charState.combat?.mentalEnergy);
                setActualDA(charState.combat?.da);
                setActualXP(charState.level?.actualXP)
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

    const [showStand, setShowStand] = useState(false);
    const [showChar, setShowChar] = useState(true);


    return <>
        <menu className="generic-list logged-menu">
            <li onClick={e => {
                setShowChar(true);
                setShowStand(false)
            }}>PERSONAGEM</li>
            <li onClick={e => {
                setShowChar(false);
                setShowStand(true);
            }}>STAND</li>
            <li>INVENTÁRIO</li>
        </menu>
        {showChar && <LoggedChar
            charState={charState}
            actualLife={actualLife}
            setActualLife={setActualLife}
            actualMentalEnergy={actualMentalEnergy}
            setActualMentalEnergy={setActualMentalEnergy}
            actualDA={actualDA}
            setActualDA={setActualDA}
            actualXP={actualXP}
            setActualXP={setActualXP}
            setRolling={setRolling}
            setRollingText={setRollingText}
            setRollConfigs={setRollConfigs}
        />}
        {showStand && <LoggedStand
            standState={standState}
            subStandState={subStandState}
            setRolling={setRolling}
            setRollingText={setRollingText}
            setRollConfigs={setRollConfigs}
        />}
        { rolling && <DiceRoll rollConfigs={rollConfigs} setRolling={setRolling}>{rollingText}</DiceRoll> }
    </>;
}

export default Logged;