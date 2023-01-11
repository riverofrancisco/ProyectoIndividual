import React, { useEffect } from "react";
import './Pagination.css'

export default function Pagination({recipesPerPage, totalRecipes, paginate}) {
    
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++){
        pageNumbers.push(i)
    }

    const activeCSS = () => {
        const buttons = document.getElementsByClassName('pageNumber');
        for (let i=0; i<buttons.length ; i++){
            buttons[i].addEventListener("click", function(){
                this.className += "-active";
                let current = document.getElementsByClassName("pageNumber-active");
                current.className = current.className.replace("-active", "");
                
            })
        } 
    }

 
    return (
        <nav className="paginationBar">
            <ul className="listofpages">
                {pageNumbers.map(number => {return(
                    <li key={number}>
                        <a className='pageNumber' onClick={() => paginate(number)}>{number}</a>
                    </li>
                )})}
            </ul>
        </nav>
    )
}