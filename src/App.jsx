import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import { useCookies } from 'react-cookie';

/* PAGES */
import Choose from './pages/Choose';
import Register from './pages/Register';
import RegisterCharacter from './pages/RegisterCharacter';
import RegisterStand from './pages/RegisterStand';
import Registering from './pages/Registering';
import Logged from './pages/Logged';
import Login from './pages/Login';

const Container = styled.div`
    border: 3px solid #272727;
    min-width: 90%;
    max-width: 90%;
    width: fit-content;
    padding: 10px;
    min-height: 93vh;
    margin-top: 45px;
    margin-bottom: 20px;
    height: fit-content;
    position: relative;

    box-shadow:  25px 25px 51px #828282,
                -25px -25px 51px #ffffff;
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
            />} />
            <Route path='/registering' element={<Registering
                cookies={cookies}
                setCookie={setCookie}
            />}/>
            <Route path='/logged' element={<Logged/>} />
            <Route path='/login' element={<Login cookies={cookies} setCookie={setCookie}/>} />
        </Routes>
    </Container>;
}

export default App;