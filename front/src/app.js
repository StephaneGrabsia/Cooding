import React from "react";
import { createRoot } from 'react-dom/client';
import SignInOutContainer from "./containers";
import './styles/style.scss'


const App = () => {
    return (
        <div className="app">
            <SignInOutContainer />
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);