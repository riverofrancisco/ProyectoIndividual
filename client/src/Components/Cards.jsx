import {React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecipes, getDiets } from "../actions/actions";
import Card from "./Card";




import './Cards.css';

export default function Cards(){
   const dispatch = useDispatch();
   const allRecipes = useSelector((state) => state.recipes);
   const allDiets = useSelector((state) => state.diets);
  console.log('hola')
   useEffect(() => {
    console.log(allRecipes);
    dispatch(getRecipes());
    console.log(allRecipes);
   }, [dispatch]);



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

/*       return (
        <div className = 'cards'>
          <Card
              key={allRecipes[0].id}
              id={allRecipes[0].id}
              title={allRecipes[0].title}
              healthScore={allRecipes[0].healthScore}
              summary={allRecipes[0].summary}
              image={allRecipes[0].image}
            />
            
        </div>
      ); */
}