import {React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './NavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { filterByDiet, getDiets, getRecipes, alphabeticOrder, healthScoreOrder } from '../actions/actions';


export default function Navbar({setOrder}){

    const dispatch = useDispatch();
    const allDiets = useSelector((state) => state.diets);

    ///// ORDER BY TITLE OR HEALTHSCORE /////////

    const handleOrder = (e) => {
        if(e.target.value === 'az' || e.target.value === 'za'){
            dispatch(alphabeticOrder(e.target.value))
            setOrder(e.target.value);
        } else {
            dispatch(healthScoreOrder(e.target.value))
        }
    }

    ///// FILTER BY DIET ////////
    const [filterDiets, setfilterDiets] = useState([]);

    const handleFilter = (e) => {
        if(e.target.value === 'ALL'){
            setfilterDiets([])
            dispatch(getRecipes())
        } else {
            setfilterDiets([...filterDiets, e.target.value])
            dispatch(filterByDiet(e.target.value))
        }
        
    }

    return (
       <div>
       <nav>
            <div onClick={() => window.location.reload()}>
                <Link to ='/home'>
                Home Page
                </Link>
            </div>
           
            <div>
                <label>Order by:</label>
                <select onChange={(e)=> handleOrder(e)}>
                    <option >Choose order</option>
                    <option value='az'>Title A-Z</option>
                    <option value='za'>Title Z-A</option>
                    <option value='HSdes'>HealthScore ↓</option>
                    <option value='HSasc'>HealthScore ↑</option>
                </select>
            </div>
            
            <div>
                <label>Filter by diet-type:</label>
                <select onChange={(e)=> handleFilter(e)}>
                    <option>--- Choose a Diet</option>
                    <option value='ALL'>All Diets</option>
                    {allDiets.map(d => {return (<option key={d} value={d} >{d}</option>)})}
                </select>
            </div>

            <div>
                <button>
                <Link to ='/home/creationform'>
                Add your own recipe
                </Link>                
                </button>
            </div>

            <div>
            <Link to ='/home/diets'>
             Our Diets
            </Link>
            </div>

            <SearchBar 
            />
            
        </nav>
        <hr />
        
        {filterDiets.map(d => {return (<div key={d}> {d}</div>)})}
        
        </div>
    );
};