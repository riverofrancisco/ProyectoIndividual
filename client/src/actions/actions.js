
export const getRecipes = () => { 
    return (dispatch) => {
        fetch('http://localhost:3001/recipes').then(response => response.json())
        .then(data => {return dispatch({type: 'GET_RECIPES', payload: data})})
        .catch((e) => console.log('Error:', e));

        /* return dispatch({type: 'GET_RECIPES', payload: json}); */
    }
   } 

  /*  return (dispatch) => {fetch('http://localhost:3001/recipes').then((r) => {return r.json();}).then((response) => {return dispatch({type: 'GET_RECIPES', payload: response});}).catch((error) => console.log('Error:', error));   }; */






export const getDiets = () => { 
    return async (dispatch) => {
        let json = await fetch('http://localhost:3001/diets').then(response => response.json());

        return dispatch({type: 'GET_DIETS', payload: json});
    }
   }  

/* export const findRecipe = (title) => {
    fetch(`http://localhost:3001/recipes?name=${title}`)
      .then(response => response.json())
      .then(data => {
        if(typeof data !== 'string'){
          return data
        }
      })
  } */
