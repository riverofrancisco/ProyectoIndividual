import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar({findRecipe}){
    return (
        <nav>
            <Link to ='/recipes'>
                <span>
                Recipes
                </span>
            </Link>
            
                <span>
                Order by
                <ul>
                    <Link to ='/recipes/ordered1'>
                    <li>A-Z</li>
                    </Link>
                    <Link to ='/recipes/ordered2'>
                    <li>Z-A</li>
                    </Link>
                </ul>
                </span> 
            <SearchBar 
                findRecipe={findRecipe}
            />
        </nav>
    );
};