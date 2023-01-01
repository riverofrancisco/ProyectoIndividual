import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'

export default function Welcomepage(){
    return (
        <div className='cuerpo'>
            <div>
            <Link to='/home'>
             Go to HomePage
            </Link>
            <h1>Henry Food</h1>
            <h2>It's working</h2>
          </div>

        </div>
    );
}