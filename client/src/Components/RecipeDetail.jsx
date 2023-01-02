import {React, useEffect } from "react";
import './RecipeDetail.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../actions/actions";


export default function RecipeDetail(){

const dispatch = useDispatch();
const { title, image, summary, healthScore, diets, stepBYstep} = useSelector((state) => state.recipe);
  
const { id } = useParams();

console.log(`Renderizando detail of recipe id: ${id} y ${title}`)
  
useEffect(() => {
    console.log(title);
    dispatch(getRecipeDetail(id))
   }, [id]);  
    
    return (
        
        <div className='detail'>
            <Link to = '/home'  className="button">
                <button>←</button>
            </Link>
            
            <div >
                <img src= {image} alt="PhotoHere" />
            
            <div className='card-title'>
                    <h1>{title}</h1>
                    <h2>Diets: {diets?.join(', ')}</h2>
            </div>
           <div className='card-body'>
            <h3>HealthScore: {healthScore}</h3>
                <h4>Step by Step</h4>

                <p>{summary}</p>
                
                <ul>{stepBYstep?.map((step) => {return (<li>{step}</li>)})}
                </ul>

            </div> 
            </div>
       </div>
    );
};