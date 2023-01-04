import {React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecipes, getDiets } from "../actions/actions";
import Card from "./Card";
import './Cards.css';


export default function Cards(){
  const allRecipes = useSelector((state) => state.recipes);
  /* const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  
  
  console.log('Renderizando Recipes')
  
  
    useEffect(() => {
      console.log(allRecipes);
      dispatch(getRecipes());
      console.log(allRecipes);
    }, [dispatch]);
   */

  return (
        <div className = 'cards'>
         
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