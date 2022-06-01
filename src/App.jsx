import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components'

/* PAGES */
import Choose from './pages/Choose';
import Register from './pages/Register';
import RegisterCharacter from './pages/RegisterCharacter';
import RegisterStand from './pages/RegisterStand';

const Container = styled.div`
    border: 3px solid black;
    width: 90%;
    padding: 10px;
    min-height: 93vh;
    margin-top: 20px;
    margin-bottom: 20px;
    height: fit-content;
    position: relative;
`;

function App() {
    const [ playerState, setPlayerState ] = useState({})
    const [ charState, setCharState ] = useState({})
    const [ standState, setStandState ] = useState({})

    return <Container>
        <Routes>
            <Route path='/' exact element={<Choose/>}/>
            <Route path='/register' element={<Register setPlayerState={setPlayerState}/>}/>
            <Route path='/character' element={<RegisterCharacter setCharState={setCharState} />} />
            <Route path='/stand' element={<RegisterStand setStandState={setStandState} standState={standState} />} />
        </Routes>
    </Container>;
}

export default App;
