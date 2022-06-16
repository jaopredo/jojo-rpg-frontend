import React, { useEffect, useState } from "react";
import axios from "axios";

/* CSS */
import '../sass/logged.scss';

/* COMPONENTS */
import LoggedChar from '../components/LoggedChar';
import LoggedStand from "../components/LoggedStand";
import Inventory from "../components/Inventory";
import DiceRoll from "../components/DiceRoll";

function Logged({ cookies, setCookie }) {
    // let temporaryToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWU4ZmQ0Yzc1MWZlNWFmYTYwNGI3ZSIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiYWNjZXNzIjoicGxheWVyIiwiaWF0IjoxNjU0NTU4Njc2LCJleHAiOjE2ODYxMTg2NzZ9.XDpnChis6OkTK_P43mwHaDVzV01c0OzY6WBVGejrsEY";
    // setCookie('token', temporaryToken)

    const [ charState, setCharState ] = useState({});
    const [ standState, setStandState ] = useState({});
    const [ subStandState, setSubStandState ] = useState({});
    const [ inventoryState, setInventoryState ] = useState({});

    const [ rolling, setRolling ] = useState(false);
    const [ rollingText, setRollingText ] = useState('');
    const [ rollConfigs, setRollConfigs ] = useState({});

    const [ actualLife, setActualLife ] = useState();
    const [ actualMentalEnergy, setActualMentalEnergy ] = useState();
    const [ actualDA, setActualDA ] = useState();
    const [ actualXP, setActualXP ] = useState();

    useEffect(() => {
        /* Setando os valores do PERSONAGEM */
        axios.get(`${process.env.REACT_APP_API_URL}/character`, {
            headers: {
                authorization: `JOJO ${cookies.token}`
            }
        }).then(resp => {
            setCharState(resp.data)
        }).catch(err => {
            if (err) console.log(err.response.data)
        })

        /* Setando os valores do STAND */
        axios.get(`${process.env.REACT_APP_API_URL}/stand`, {
            headers: {
                authorization: `JOJO ${cookies.token}`
            }
        }).then(resp => {
            setStandState(resp.data)
        }).catch(err => {
            if (err) console.log(err.response.data)
        })

        /* INVENTÁRIO */
        axios.get(`${process.env.REACT_APP_API_URL}/inventory`, {
            headers: {
                authorization: `JOJO ${cookies.token}`
            }
        }).then(resp => {
            setInventoryState(resp.data)
        }).catch(err => {
            if (err) console.log(err.response.data)
        })
    }, [])
    
    useEffect(() => {
        setActualLife(charState.combat?.life);
        setActualMentalEnergy(charState.combat?.mentalEnergy);
        setActualDA(charState.combat?.da);
        setActualXP(charState.level?.actualXP)
    }, [ charState ])

    const [showInventory, setShowInventory] = useState(false);
    const [showStand, setShowStand] = useState(false);
    const [showChar, setShowChar] = useState(true);


    return <>
        <menu className="generic-list logged-menu">
            <li onClick={() => {
                setShowChar(true);
                setShowStand(false)
                setShowInventory(false)
            }}>PERSONAGEM</li>
            <li onClick={() => {
                setShowChar(false);
                setShowStand(true);
                setShowInventory(false)
            }}>STAND</li>
            <li onClick={() => {
                setShowInventory(true)
                setShowChar(false)
                setShowStand(false)
            }}>INVENTÁRIO</li>
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
        {showInventory && <Inventory
            charName={charState.basic?.name}
            inventoryState={inventoryState}
            setInventoryState={setInventoryState}
        />}
        { rolling && <DiceRoll rollConfigs={rollConfigs} setRolling={setRolling}>{rollingText}</DiceRoll> }
    </>;
}

export default Logged;