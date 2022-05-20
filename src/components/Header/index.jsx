import React from 'react';
import './style.scss'

import TaskLogo from '../../images/logo-tarefa.png';

function Header({ children }) {
    return <header>
        <h1 className='main-title'>{children}</h1>
        <img src={TaskLogo} alt='Logo força-tarefa' className='task-logo' />
    </header>;
}

export default Header;