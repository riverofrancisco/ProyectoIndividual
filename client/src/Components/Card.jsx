import React from 'react';
import './Card.css';

export default function Card({id, title, summary, image}){

    return (
        <div className='card'>
            <div>
            <img src= {image} alt="PhotoHere" />
            </div>
            <div className='card-title'>
            <h5>{title}</h5>
            <div className='card-body'>
                <p>id: {id}</p>
                <p>Summary</p>
                <p>{summary}</p>
            </div>
            </div>       
       </div>
    );


};