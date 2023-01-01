import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';

import Cards from './Components/Cards.jsx';
import Welcomepage from './Components/Welcome';
import Navbar from './Components/NavBar';
import Diets from './Components/Diets';
import RecipeDetail from './Components/RecipeDetail'


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
          path = '/home/mydiets' 
          component={Diets}
          />

          <Route 
          path = '/home/:id'
          component={RecipeDetail}
          />

      <hr />
    </div>
  );
}

export default App;
