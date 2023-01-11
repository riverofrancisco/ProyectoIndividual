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
            dispatch(healthScoreOrder(e.target.value));
            setOrder(e.target.value)
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
       <nav className='headerNavbar'>
            <Link to ='/home'>
 {/*            <div>
            <img className='logo' src='https://ih1.redbubble.net/image.545261467.0310/st,small,507x507-pad,600x600,f8f8f8.u1.jpg' alt='logo' />
            </div> */}
           
            <div className='buttonLink' onClick={() => window.location.reload()}>
                <label>Home Page</label>    
            </div>
            
                
            </Link>
            <div className='buttonLink'>
                <label>Order by:</label>
                <select className='selectMenu' onChange={(e)=> handleOrder(e)}>
                    <option >Order By</option>
                    <option value='az'>Title A-Z</option>
                    <option value='za'>Title Z-A</option>
                    <option value='HSdes'>HealthScore ↓</option>
                    <option value='HSasc'>HealthScore ↑</option>
                </select>
            </div>
            
            <div className='buttonLink'>
                <label>Filter by diet-type:</label>
                <select className='selectMenu' onChange={(e)=> handleFilter(e)}>
                    <option>--- Choose a Diet</option>
                    <option value='ALL'>Clear Filter</option>
                    {allDiets.map(d => {return (<option key={d} value={d} >{d}</option>)})}
                </select>
            </div>

            <div className='buttonLink'>
                <Link to ='/home/creationform'>
                Add your own recipe
                </Link>                
            </div>

{/*             <div>
            <Link to ='/home/diets'>
             Our Diets
            </Link>
            </div> */}
            
            <div className='buttonLink'>
            <SearchBar 
            />
            </div>

            
        </nav>
        
        {filterDiets.map(d => {return (<div key={d}> {d}</div>)})}
        
        </div>
    );
};