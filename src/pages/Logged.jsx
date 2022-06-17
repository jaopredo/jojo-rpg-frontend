import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

/* CSS */
import '../sass/logged.scss';

/* COMPONENTS */
import LoggedChar from '../components/LoggedChar';
import LoggedStand from "../components/LoggedStand";
import Inventory from "../components/Inventory";
import { DiceRoll, Barragem } from "../components/DiceRoll";
import LevelUpForm from "../components/LevelUpForm";

function Logged() {
    const cookies = new Cookies();

    const [ charState, setCharState ] = useState({});
    const [ standState, setStandState ] = useState({});
    const [ subStandState, setSubStandState ] = useState({});
    const [ inventoryState, setInventoryState ] = useState({});

    const [ rolling, setRolling ] = useState(false);
    const [ rollingText, setRollingText ] = useState('');
    const [ rollConfigs, setRollConfigs ] = useState({});

    const [ barrage, setBarrage ] =  useState(false);
    const [ barrageConfigs, setBarrageConfigs ] = useState({});

    const [ actualLife, setActualLife ] = useState();
    const [ actualMentalEnergy, setActualMentalEnergy ] = useState();
    const [ actualDA, setActualDA ] = useState();
    const [ actualXP, setActualXP ] = useState();

    const [ levelUp, setLevelUp ] = useState(false);
    const [ showUpForm, setShowUpForm ] = useState(false);

    useEffect(() => {
        const token = cookies.get('token')
        /* Setando os valores do PERSONAGEM */
        axios.get(`${process.env.REACT_APP_API_URL}/character`, {
            headers: {
                authorization: `JOJO ${token}`
            }
        }).then(resp => {
            if (resp.data.error){
                console.log(resp.data.msg)
                return;
            }
            setCharState(resp.data)
        }).catch(err => {
            if (err) console.log(err.response.data)
        })

        /* Setando os valores do STAND */
        axios.get(`${process.env.REACT_APP_API_URL}/stand`, {
            headers: {
                authorization: `JOJO ${token}`
            }
        }).then(resp => {
            if (resp.data.error){
                console.log(resp.data.msg);
                return;
            }
            setStandState(resp.data)
        }).catch(err => {
            if (err) console.log(err.response.data)
        })

        /* Setando os valores do SUBSTAND */
        axios.get(`${process.env.REACT_APP_API_URL}/substand`, {
            headers: {
                authorization: `JOJO ${token}`
            }
        }).then(resp => {
            if (resp.data.error){
                console.log(resp.data.msg)
                return;
            }
            setSubStandState(resp.data)
        }).catch(err => {
            if (err) console.log(err.response.data)
        })

        /* INVENTÁRIO */
        axios.get(`${process.env.REACT_APP_API_URL}/inventory`, {
            headers: {
                authorization: `JOJO ${token}`
            }
        }).then(resp => {
            if (resp.data.error){
                console.log(resp.data.msg)
                return;
            }
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
            levelUp={levelUp}
            setLevelUp={setLevelUp}
            setShowUpForm={setShowUpForm}
        />}
        {showStand && <LoggedStand
            standState={standState}
            subStandState={subStandState}
            setRolling={setRolling}
            setRollConfigs={setRollConfigs}
            setBarrageConfigs={setBarrageConfigs}
            setBarrage={setBarrage}
        />}
        {showInventory && <Inventory
            charName={charState.basic?.name}
            inventoryState={inventoryState}
            setInventoryState={setInventoryState}
            setRolling={setRolling}
            setRollConfigs={setRollConfigs}
        />}
        { rolling && <DiceRoll rollConfigs={rollConfigs} setRolling={setRolling}>{rollingText}</DiceRoll> }
        { barrage && <Barragem barrageConfigs={barrageConfigs} setBarrage={setBarrage}/> }
        { showUpForm && <LevelUpForm
            setShowUpForm={setShowUpForm}
            charSpecs={charState.specialitys}
            charAttrs={charState.attributes}
        /> }
    </>;
}

export default Logged;