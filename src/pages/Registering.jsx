import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registering({ cookies, setCookie }) {
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            await axios.post(`${process.env.REACT_APP_API_URL}/player/register`, cookies).then(
                resp => {
                    setCookie('token', resp.data.token);
                    navigate('/logged')
                }
            ).catch(err => { if (err) console.log(err) })
        }
        fetchData();
    }, [cookies, setCookie, navigate])

    return <>
        REDIRECIONANDO, AGUARDE...
    </>;
}

export default Registering;