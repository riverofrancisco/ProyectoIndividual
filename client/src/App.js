import './App.css';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import Card from './Components/Card.jsx';
import Cards from './Components/Cards';
import Welcomepage from './Components/Welcome';
import Navbar from './Components/NavBar';

function App() {
  const [recipes, setRecipes] = useState([]);

  fetch('http://localhost:3001/recipes')
  .then(response => response.json())
  .then(data => setRecipes(oldRecipes => [...oldRecipes, data]));
  


  return (
    <div className="App">

     
     <Route 
      exact path = '/' 
      component={Welcomepage} 
      />

      <Route 
      path = '/recipes' 
      component = {Navbar} 
      />

      <Route 
      exact path = '/recipes' 
      render = {() => <Cards recipes={recipes} />}
      />

      <hr />
    </div>     

  );
}

export default App;
