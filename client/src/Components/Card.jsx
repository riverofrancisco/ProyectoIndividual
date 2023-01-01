import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';


export default function Card({id, title, summary, healthScore, image, diets}){

    const PATH = `/home/${id}`
    return (
        <div className='card'>
            <Link to = {PATH}>
                <div>
                <img src= {image} alt="PhotoHere" />
                </div>
                <div className='card-title'>
                <h4>{title}</h4>
                </div> 
            </Link>
            <div className='card-body'>
                <h5>HealthScore: {healthScore}</h5>
                <p>Diets: {diets}</p>
            </div>       
       </div>
    );


};