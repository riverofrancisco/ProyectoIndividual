import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './NavBar.css'
import { useDispatch } from 'react-redux';
import { getRecipes } from '../actions/actions';

export default function Navbar({findRecipe}){
    const dispatch = useDispatch();
    
    
    return (
       <nav>
            <Link to ='/home' onClick={dispatch(getRecipes())}>
             Home Page
            </Link>
            
            <Link to ='/home'>
             A-Z Order
            </Link>

            <Link to ='/home'>
             Filter by diet-type
            </Link>

            <Link to ='/home/creationform'>
             Add your own recipe
            </Link>

            <Link to ='/home/diets'>
             Our Diets
            </Link>

            <SearchBar 
            findRecipe={findRecipe}/>
        </nav>
    );
};