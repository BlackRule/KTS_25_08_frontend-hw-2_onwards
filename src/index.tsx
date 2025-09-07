import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.css';
import Idx from "./Idx";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <Idx/>
    </React.StrictMode>
);
