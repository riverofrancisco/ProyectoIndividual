import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


export default function Form(){

const [input, setInput] = useState({
    title: '',
    summary: '',
    healthScore: 0,
    stepBYstep: [],
    diets: [],
    image: '',
})

const [error, setError] = useState('');

function validateHS(value) {
   /*  var number = /^(100|[1-9][0-9]?)$/; */ // Expresion Regular para validar numbers 1-100.

    if(value > 100 || value <= 0) {//chequear si no hay error, limpiar el error.
      console.log('entro al if')
      setError('El healthScore debe ser un número entre el 1 y el 100');
    } else {
      setError('')
    }
  };

function handleChange(e) {
    const { value, name } = e.target;
  
    if (name === 'healthScore') {
        validateHS(input.healthScore)
      }
  
      setInput({
        ...input,
        [name]: value // Sintaxis ES6 para actualizar la key correspondiente
      });
};

    return (
        <form>
            <input
                name="title"
                type="text"
                value={input.name}
                onChange={handleChange}
                placeholder="Title" />
             <input
                name="summary"
                type="text"
                value={input.name}
                onChange={handleChange}
                placeholder="Summary" />
             <input
                name="healthScore"
                type="number"
                value={input.name}
                onChange={handleChange}
                placeholder="HealthScore" />
            <input
                name="stepBYstep"
                type="text"
                value={input.name}
                onChange={handleChange}
                placeholder="Step" />
            <input
                name="diets"
                type="checkbox"
                value={input.name}
                onChange={handleChange}
                placeholder="Diets" /><label>
                    Vegan
                </label>

           {!error ? null : <div>{error}</div>}
            <input type="submit" value="Add Recipe" />
        </form>
    )
}