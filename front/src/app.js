import React from "react";
import ReactDOM from "react-dom";
import SignInOutContainer from "./containers";

//import './styles/style.scss'


const App = () => {
    return (
        <div className="app">
            <SignInOutContainer/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))