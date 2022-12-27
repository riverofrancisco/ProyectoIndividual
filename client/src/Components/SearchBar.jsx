import React, { useState } from "react";

export default function SearchBar ({findRecipe}) {
 const [recipe, setRecipe] = useState("");  
 return (
    <form onSubmit={(e) => {
        e.preventDefault();
        findRecipe(recipe);
      }}>
        <input
          type="text"
          placeholder="Recipe..."
          value={recipe}
          onChange={e => setRecipe(e.target.value)}
        />
        <input type="submit" value="Buscar" />
      </form>
 )
}