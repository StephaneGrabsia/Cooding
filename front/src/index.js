import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
// import './styles/style.css'
import './styles/style.scss';

const App = () => {
  const [description, setDescription] = useState([]);

  useEffect(() => {
    getNotes();
  });

  const getNotes = async () => {
    const response = await fetch('http://localhost:8000/');
    const data = await response.json();
    console.log('DATA : ', data);
    setDescription(data[0]['description']);
  };
  // console.log({description})
  return (<h1>Coucou Hector.
    Voici quelque chose que j'ai récupéré sur l'API : {description}
  </h1>);
};

ReactDOM.render(<App />, document.getElementById('root'));
