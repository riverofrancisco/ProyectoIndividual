let Recipes = [];
fetch('http://localhost:3001/recipes')
.then(response => response.json())
.then(data => Recipes.push(data));

export default Recipes;