import {React, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Welcome.css'

import { useDispatch, useSelector } from "react-redux";

import { getRecipes, getDiets } from "../actions/actions";

export default function Welcomepage(){
    

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
      
      
      console.log('Renderizando Recipes')
      
      
        useEffect(() => {
          console.log(allRecipes);
          dispatch(getRecipes());
          console.log(allRecipes);
        }, [dispatch]);
    
    
    return (
        <div className='cuerpo'>
            <div>
            <button>
            <Link to='/home'>
             Go to HomePage
            </Link>
            </button>

            <h1>Henry Food</h1>
            <h2>It's working</h2>
          </div>

        </div>
    );
}