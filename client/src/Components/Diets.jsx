import React from 'react';
import './Card.css';

import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets } from "../actions/actions";


export default function Diets(){


    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.diets);


    return (
        <div className='card'>
            <div className='card-body'>
                <p>{allDiets}</p>
            </div>       
       </div>
    );
};