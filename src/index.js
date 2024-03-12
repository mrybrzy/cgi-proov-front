import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ReactRouter} from './ReactRouter'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ReactRouter />
    </React.StrictMode>
);

reportWebVitals();