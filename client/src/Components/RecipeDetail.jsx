import {React, useEffect } from "react";
import './RecipeDetail.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../actions/actions";


export default function RecipeDetail(){

const history = useHistory();
const dispatch = useDispatch();
const { title, image, summary, healthScore, diets, stepBYstep} = useSelector((state) => state.recipe);
  
const { id } = useParams();

console.log(`Renderizando detail of recipe id: ${id} y ${title}`)
  
useEffect(() => {
    console.log(title);
    dispatch(getRecipeDetail(id))
   }, [id]);  
    
    return (
        
        <div className='detail' key={id}>
            <button onClick={() => history.push('/home')}>←</button>
            
            
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
                
                <ol>{stepBYstep?.map((step) => {return (<li key={step}>{step}</li>)})}
                </ol>

            </div> 
            </div>
       </div>
    );
};