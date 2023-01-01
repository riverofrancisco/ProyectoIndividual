import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './NavBar.css'

export default function Navbar({findRecipe}){
    return (
       <nav>
            <Link to ='/home'>
             Home Page
            </Link>
            
            <Link to ='/home'>
             A-Z Order
            </Link>

            <Link to ='/home'>
             Filter by diet-type
            </Link>

            <Link to ='/home/creation-form'>
             Add your own recipe
            </Link>

            <Link to ='/home/our-diets'>
             Our Diets
            </Link>

            <SearchBar 
            findRecipe={findRecipe}/>
        </nav>
    );
};