import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';


export default function Card({id, title, summary, healthScore, image, diets}){

    const PATH = `/home/recipedetail/${id}`
    return (
        <div className='card'>
            <Link to = {PATH}>
                <div>
                <img className='img-grande' src= {image} alt="PhotoHere" />
                </div>
                <div className='card-title'>
                <h4>{title}</h4>
                </div> 
            </Link>
            <div className='card-body'>
                <h4 className='card-HS'>HealthScore - {healthScore}</h4>
                <h4 className='card-Diets'>Diets</h4>
                <p className='card-diets'>{diets}</p>
            </div>       
       </div>
    );


};