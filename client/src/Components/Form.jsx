import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './Form.css'


export default function Form(){
const history = useHistory();
  //// STATES //////

const allDiets = useSelector((state) => state.diets)
const [input, setInput] = useState({
    title: '',
    summary: '',
    healthScore: 0,
    stepBYstep: [],
    diets: [],
    image: '',
})
const [error, setError] = useState('');

//// VALIDATIONS ///////
function validateHS(value) {
    setError('');
    if(value > 100 || value <= 0) {//chequear si no hay error, limpiar el error.
      console.log(`${value} entro al if`)
      setError('El healthScore debe ser un número entre el 1 y el 100');
    } else {
      setError('')
    }
  };

//// HANDLES ///////
const handleChange = (e) => {
    const {value, name} = e.target;
      if(name === 'healthScore'){
        validateHS(input.healthScore)};
    setInput({...input,
                 [name]: value // Sintaxis ES6 para actualizar la key correspondiente
             });
};


const addStep = (e) => {
  setInput({
    ...input,
  })
}



const handleSubmit = () => {
  console.log('Receta creada')
}



    return (
        <div className='inputs'>
        <button onClick={() => history.push('/home')}>←</button>

        <form onSubmit={handleSubmit} className='creationForm'>
            <input
                name="title"
                type="text"
                value={input.name}
                onChange={(e) => handleChange(e)}
                placeholder="Title" />
             <input
                name="summary"
                type="text"
                value={input.name}
                onChange={(e) => handleChange(e)}
                placeholder="Summary" />
             <input
                name="healthScore"
                type="number"
                value={input.name}
                onChange={(e) => handleChange(e)}
                placeholder="HealthScore" />
            <input type="button" value="Add Step" onClick={addStep}/>
             <input
                name="stepBYstep"
                type="text"
                value={input.name}
                onChange={handleChange}
                placeholder="Step" /> 
            
            {allDiets.map((diet) => {
              return (
                <div key={diet}>
                  <label htmlFor='diets'>{diet}</label>
                <input
                type='checkbox'
                name='diets'
                value='input.name'
                onChange={handleChange}  />
                </div>
                
              )
            })}

           {!error ? null : <div>{error}</div>}
            <input type="submit" value="Add Recipe" />
        </form>
        </div>

    )
}