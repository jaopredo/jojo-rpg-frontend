import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useCookies } from 'react-cookie';

/* PAGES */
import Choose from './pages/Choose';
import Register from './pages/Register';
import RegisterCharacter from './pages/RegisterCharacter';
import RegisterStand from './pages/RegisterStand';
import Logged from './pages/Logged';

const Container = styled.div`
    border: 3px solid black;
    min-width: 90%;
    width: fit-content;
    padding: 10px;
    min-height: 93vh;
    margin-top: 20px;
    margin-bottom: 20px;
    height: fit-content;
    position: relative;
`;

function App() {
    const [ cookies, setCookie ] = useCookies([
        "email",
        "password",
        "character",
        "stand",
        "substand",
        "token"
    ]);

    // Fazendo validação para verificar se usuário já não entrou anteriormente
    const navigate = useNavigate();

    const [ action, setAction ] = useState('');

    return <Container>
        <Routes>
            <Route path='/' exact element={<Choose/>}/>
            <Route path='/register/player' element={<Register setPlayerCookie={setCookie} />}/>
            <Route path='/register/character' element={<RegisterCharacter
                charCookies={cookies}
                setCharCookie={setCookie}
            />} />
            <Route path='/register/stand' element={<RegisterStand
                standCookies={cookies}
                setStandCookie={setCookie}
                setAction={setAction}
            />} />
            <Route path='/logged' element={
                <Logged
                    action={action}
                    cookies={cookies}
                    setCookie={setCookie}
                />
            } />
        </Routes>
    </Container>;
}

export default App;