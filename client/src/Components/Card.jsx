import React from 'react';
import './Card.css';

export default function Card({id, title, summary, healthScore, image, diets}){

    return (
        <div className='card'>
            <div>
            <img src= {image} alt="PhotoHere" />
            </div>
            <div className='card-title'>
            <h4>{title}</h4>
            <div className='card-body'>
                <h5>HealthScore: {healthScore}</h5>
                <p>Diets: {diets}</p>
            </div>
            </div>       
       </div>
    );


};