import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { findRecipeByTitle } from "../actions/actions";

import './SearchBar.css'

export default function SearchBar () {

  const [title, setTitle] = useState('');
  const dispatch = useDispatch();


 return (
    <form  onSubmit={(e) => {
        e.preventDefault();
        dispatch(findRecipeByTitle(title));
      }}>
        <input
          type="text"
          placeholder="Recipe..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input className='searchBarButton' type="submit" value="Search" />
      </form>
 )
}