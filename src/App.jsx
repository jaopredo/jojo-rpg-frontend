import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components'

/* PAGES */
import Choose from './pages/Choose';
import Register from './pages/Register';
import RegisterCharacter from './pages/RegisterCharacter';

const Container = styled.div`
    border: 3px solid black;
    width: 90%;
    min-height: 93vh;
    margin-top: 20px;
    margin-bottom: 20px;
    height: fit-content;
    position: relative;
`;

function App() {
    const [ playerState, setPlayerState ] = useState({
        email: '',
        password: '',
    })

    const [ charState, setCharState ] = useState({})
    return <Container>
        <Routes>
            <Route path='/' exact element={<Choose/>}/>
            <Route path='/register' element={<Register setPlayerState={setPlayerState}/>}/>
            <Route path='/character' element={<RegisterCharacter setCharState={setCharState} />} />
        </Routes>
    </Container>;
}

export default App;
