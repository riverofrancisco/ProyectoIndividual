import React from "react";
import './Pagination.css'

export default function Pagination({recipesPerPage, totalRecipes, paginate}) {
    
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination a">
                {pageNumbers.map(number => {return(
                    <li key={number}>
                        <a onClick={() => paginate(number)}>{number}</a>
                    </li>
                )})}
            </ul>
        </nav>
    )
}