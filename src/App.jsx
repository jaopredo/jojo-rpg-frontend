import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components'

/* PAGES */
import Choose from './pages/Choose';
import Register from './pages/Register';

const Container = styled.div`
    border: 3px solid black;
    width: 96%;
    height: 98vh;
    position: relative;
`;

function App() {
    const [ playerState, setPlayerState ] = useState({
        email: '',
        password: '',
    })
    return <Container>
        <Routes>
            <Route path='/' exact element={<Choose/>} />
            <Route path='/register' element={
                <Register playerState={playerState} setPlayerState={setPlayerState}/>
            } />
        </Routes>
    </Container>;
}

export default App;
