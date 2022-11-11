import React from 'react';
import {createRoot} from 'react-dom/client'

import {BrowserRouter} from 'react-router-dom';

import App from './App';

const container=document.getElementById('root');
const rootElement=createRoot(container);

//use to render on screen
rootElement.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)