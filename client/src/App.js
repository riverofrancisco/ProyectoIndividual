import './App.css';
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import Card from './Components/Card.jsx';
import Cards from './Components/Cards';
import Welcomepage from './Components/Welcome';
import Navbar from './Components/NavBar';
import Diets from './Components/Diets';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [diets, setDiets] = useState([]);

/*   function getRecipes(){ */
    fetch('http://localhost:3001/recipes')
      .then(response => response.json())
      .then(data => setRecipes(oldRecipes => [...oldRecipes, data]));
/*   } */

  function findRecipe(title){
    fetch(`http://localhost:3001/recipes?name=${title}`)
      .then(response => response.json())
      .then(data => {
        if(typeof data !== 'string'){
          return data
        }
      })
  }

  fetch('http://localhost:3001/diets')
      .then(response => response.json())
      .then(data => setDiets(oldDiets => [...oldDiets, data]));
  
  useEffect(()=> {console.log('cargando diets')}, []);

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
      path = '/recipes/diets' 
      render = {() => <Diets diets={diets} />}
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
