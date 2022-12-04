import React, { useState, useEffect, useCallback} from "react";
import ReactDOM from "react-dom";
// import './styles/style.css'
import './styles/style.scss'



const App = () => {
    let [description, setDescription] = useState([]);

    const getNotes = useCallback(
      async () => {
        let response = await fetch("http://localhost:8000/");
        let data = await response.json();
        console.log("DATA : ", data);
        setDescription(data[0]["description"]);
      },
      [setDescription]
    ); 

    useEffect(() => {
        getNotes();
    }, [setDescription, getNotes])

    // console.log({description})
    return(<h1>Voici quelque chose que j'ai récupéré sur l'API : {description}</h1>)
}


ReactDOM.render(<App />, document.getElementById("root"))