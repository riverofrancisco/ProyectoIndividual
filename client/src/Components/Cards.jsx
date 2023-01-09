import {React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecipes, getDiets } from "../actions/actions";
import Card from "./Card";
import './Cards.css';
import Navbar from "./NavBar";
import Pagination from "./Pagination";


export default function Cards(){
  
  const [, setOrder] = useState('');
  const [loading, setLoading] = useState(false);

  const allRecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();  
  
  useEffect(() => {
      console.log('Renderizando Recipes')
      setLoading(true);
      dispatch(getRecipes());
      dispatch(getDiets());
      setLoading(false);
  }, [dispatch]);
  


  ///// PAGINATION /////////
  const [currentPage, setcurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  if(loading){
    return(
          <h2>Loading...</h2>
    )
  }

  return (    
        <div className = 'cards'>
          
          
          <Navbar setOrder={setOrder}/>
          


          {currentRecipes.map((r) => {return (<Card
              key={r.id}
              id={r.id}
              title={r.title}
              healthScore={r.healthScore}
              summary={r.summary}
              image={r.image}
              diets={r.diets.join(', ')}
          />) })} 
        
        
        <div>
        <Pagination 
              recipesPerPage={recipesPerPage} 
              totalRecipes={allRecipes.length}
              paginate={paginate} />
        </div>

        </div>
      );

}