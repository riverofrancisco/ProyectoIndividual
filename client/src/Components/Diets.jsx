import React from 'react';
import './Card.css';

export default function Diets({diets}){

    return (
        <div className='card'>
            <div className='card-body'>
                <ul>{diets.map(d => {return (<li>{d}</li>)})}</ul>
            </div>       
       </div>
    );
};