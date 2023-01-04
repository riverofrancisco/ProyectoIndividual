import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../actions/actions';
import { alphabeticOrder } from '../actions/actions';


export default function Navbar(){

    const dispatch = useDispatch();

    return (
       <div>
       <nav>
            <Link to ='/home' onClick={dispatch(getRecipes())}>
             Home Page
            </Link>
            
            <Link to ='/home' onClick={dispatch(alphabeticOrder())}>
             A-Z Order
            </Link>

            <Link to ='/home/filterbydiet'>
             Filter by diet-type
            </Link>

            <Link to ='/home/creationform'>
             Add your own recipe
            </Link>

            <Link to ='/home/diets'>
             Our Diets
            </Link>

            <SearchBar 
            /* findRecipe={findRecipe} *//>
            
        </nav>
        <hr />
        </div>
    );
};