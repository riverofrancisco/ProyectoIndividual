import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Card from './Components/Card.jsx';
import Cards from './Components/Cards.jsx';
import Welcomepage from './Components/Welcome';
import Navbar from './Components/NavBar';
import Diets from './Components/Diets';

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


      <hr />
    </div>
  );
}

export default App;
