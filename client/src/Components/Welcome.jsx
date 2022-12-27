import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcomepage(){
    return (
        <div>
        <Link to='/recipes'>
          Welcome to our PI Foods
        </Link>
        <h1>Henry Food</h1>
        <h2>Probando el funcionamiento</h2>
        </div>
    );
}