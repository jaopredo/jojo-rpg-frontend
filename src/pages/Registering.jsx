import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registering({ cookies, setCookie }) {
    const navigate = useNavigate();

    const fetchData = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/player/register`, cookies).then(
            resp => setCookie('token', resp.data.token)
        ).catch(err => { if (err) console.log(err) })
    }

    useEffect(() => {
        fetchData();
        navigate('/logged')
    }, [])
    return <>
        REDIRECIONANDO, AGUARDE...
    </>;
}

export default Registering;