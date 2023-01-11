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
            <button className="buttonBack" onClick={() => history.push('/home')}>←</button>
            
            
            <div className="detailCONT">
                <img className="detailIMG" src= {image} alt="PhotoHere" />
            
            <div className='grid-layout'>
            
            <div className="detail-TITLE-Content">
            <h1>{title}</h1>
            </div>
            
            <div className="detail-DIET-Content">
            <h2>Diets: {diets?.join(', ')}</h2>
            </div>
                    
            
            <div className='detail-HS-Content'>
            <h3>HealthScore: {healthScore}</h3>
            </div>

            <div className='detail-SUMM-Content'>
            <p>{summary}</p>
            </div>  
            
                
            <div className='detail-SBS-Content'>
                <h3>Step by Step</h3>
                <ol className="SBSlist">{stepBYstep?.map((step) => {return (<li key={step}>{step}</li>)})}
                </ol>
            </div>
            </div>

            </div>
       </div>
    );
};