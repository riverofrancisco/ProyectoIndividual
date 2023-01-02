import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';

import Cards from './Components/Cards.jsx';
import Welcomepage from './Components/Welcome';
import Navbar from './Components/NavBar';
import Diets from './Components/Diets';
import RecipeDetail from './Components/RecipeDetail'
import Form from './Components/Form';


function App() {

  return (
    <div className="App">
        <Route 
          exact path = '/' 
          component={Welcomepage} 
          />

          <Route 
          path = '/home' 
          component = {Navbar}
          />

          <Route 
          exact path = '/home' 
          component={Cards}
          />

          <Route 
          path = '/home/diets' 
          component={Diets}
          />

          <Route 
          path = '/home/recipedetail/:id'
          component={RecipeDetail}
          />

          <Route 
          path = '/home/creationform'
          component={Form}
          />
      <hr />
    </div>
  );
}

export default App;
