import {React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecipes, getDiets } from "../actions/actions";
import Card from "./Card";
import './Cards.css';
import Navbar from "./NavBar";


export default function Cards(){
  
  const [, setOrder] = useState('');

  const allRecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();  
  
  useEffect(() => {
      console.log('Renderizando Recipes')
      dispatch(getRecipes());
      dispatch(getDiets());
  }, [dispatch]);
  


  return (    
        <div className = 'cards'>
          
          <div>
          <Navbar setOrder={setOrder}/>
          </div>

          {allRecipes.map((r) => {return (<Card
              key={r.id}
              id={r.id}
              title={r.title}
              healthScore={r.healthScore}
              summary={r.summary}
              image={r.image}
              diets={r.diets.join(', ')}
          />) })}
            
        </div>
      );

}