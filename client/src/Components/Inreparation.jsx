import React from 'react';
import { Link } from 'react-router-dom';

export default function Reparation (){
    return(
        <div>
            Herramienta aún en construcción.
            Disculpe las molestias.

            <button>
            <Link to = '/home'>
                Back to Home
            </Link>
            </button>
        </div>
    )
}