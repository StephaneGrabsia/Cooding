import React from "react";
import ReactDOM from "react-dom";
//import './styles/style.scss'

import Login from './components/login'


const App = () => {
    return (
        <div className="app">
            <Login />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))