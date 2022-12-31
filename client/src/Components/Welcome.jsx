import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcomepage(){
    return (
        <div>
        <Link to='/recipes'>
          Go to HomePage
        </Link>
        <h1>Henry Food</h1>
        <h2>It's working</h2>
        </div>
    );
}