const initialState = {
    recipes: [],
    diets: [],
    recipe: {}
};


const theReducer = (state = initialState, action) => {
    
    switch(action.type) {

        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload};
        case 'FIND_RECIPE_TITLE':
            return {
                ...state,
                recipes: action.payload};
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload};

        case 'GET_RECIPE_DETAIL':
            return {
                ...state,
                recipe: action.payload};  

        default:
            return {...state};
    }
    
};

export default theReducer;