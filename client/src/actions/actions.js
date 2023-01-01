
export const getRecipes = () => { 
    return (dispatch) => {
        fetch('http://localhost:3001/recipes').then(response => response.json())
        .then(data => {return dispatch({type: 'GET_RECIPES', payload: data})})
        .catch((e) => console.log('Error:', e));
    }
   } 

export const getRecipeDetail = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/recipes/${id}`).then(response => response.json())
    .then(data => {return dispatch({type: 'GET_RECIPE_DETAIL', payload: data})})
    .catch((e) => console.log('Error:', e));
  }
}

export const getDiets = () => { 
    return async (dispatch) => {
        let json = await fetch('http://localhost:3001/diets').then(response => response.json());

        return dispatch({type: 'GET_DIETS', payload: json});
    }
}  
