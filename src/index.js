import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './sass/reset.scss'
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <CookiesProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </CookiesProvider>
    </Router>
);
