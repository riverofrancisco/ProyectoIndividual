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
const [currentStep, setCurrentStep] = useState({description: ''})
const [error, setError] = useState('');

//// VALIDATIONS ///////
function validateHS(e) {//Numero entre 1 y 100
    const {value, name} = e.target;
    
    if(value > 100 || value <= 0) {//chequear si no hay error, limpiar el error.
      console.log(`${value} no cumple con el HS`)
      setError('El healthScore debe ser un número entre el 1 y el 100');
    } else {
      setError('')
      setInput({
        ...input,
        [name] : value
      })
    }
  };

  function validateTitle(e) {//No puede tener simbolos.
    const {value, name} = e.target;
    
    if(/[^()[\\]{}*&^%$#@!]+/.test(value)) {//chequear si no hay error, limpiar el error.
      console.log(`${value} no cumple con el TitLe`)
      setError('El titulo debe estar compuesto sólo por letras y números');
    } else {
      setError('')
      setInput({
        ...input,
        [name] : value
      })
    }
  };

  function validateImage(event) {//debe ser una url.
    const {value, name} = event.target;
    
    if(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value)) {//chequear si no hay error, limpiar el error.
      console.log(`${value} no cumple con el formato Image`)
      setError('El valor ingresado en Image debe ser una URL');
    } else {
      setError('')
      setInput({
        ...input,
        [name] : value
      })
    }
  };

//// HANDLES ///////
const handleChange = (event) => {
    const {value, name} = event.target;
 
    if(name === 'currentStep'){
            setCurrentStep({
              description: value
            })
    } else {
            setInput({...input,
              [name]: value
            });
    } 
};

const handleStepsChange = (event) => {
  const steps = [...input.stepBYstep];
  steps[event.target.id] = event.target.value;

  setInput({
    ...input,
    stepBYstep: steps
  })
}


const Adder = (event) => {
  const {name, value} = event.target;
  if(name === 'AddStep'){
    var step = currentStep;
    setInput({
      ...input,
      stepBYstep: [...input.stepBYstep , step.description]
    })
    setCurrentStep({description: ''})

  } else if (name === 'diets') {
    setInput({
      ...input,
      [name]: [...name , value]
    })
  }
}

const Deleter = (e) => {
  e.preventDefault();
  const {id} = e.target;
  console.log(id)
  const tobeDeleted = document.getElementById(id[0]);
  console.log(tobeDeleted);
  let steps = [...input.stepBYstep];
  console.log(steps);
  let newSteps = steps.filter((element) => element !== tobeDeleted.value);
  console.log(newSteps);
  setInput({
    ...input,
    stepBYstep: newSteps
  })
}

//// SUBMIT ///////
const onSubmit = (event) => {
  event.preventDefault();
  
  fetch('http://localhost:3001/recipes',{
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      "Content-type": "application/json"
    }
  })

  console.log('Receta creada');

  setInput({    
  title: '',
  summary: '',
  healthScore: 0,
  stepBYstep: [],
  diets: [],
  image: '',
  })
}



    return (
        <div className='inputs'>
        <button onClick={() => history.push('/home')}>←</button>

        <form onSubmit={onSubmit} className='creationForm'>
            <input
                name="title"
                type="text"
                value={input.name}
                onChange={(e) => validateTitle(e)}
                placeholder="Title" />
             <input
                name="summary"
                type="text"
                value={input.name}
                onChange={(e) => handleChange(e)}
                placeholder="Summary" />
             
             <input className={error && 'danger'}
                name="healthScore"
                type="number"
                value={input.name}
                onChange={(e) => validateHS(e)}
                placeholder="HealthScore" />
            
            <input
                name="currentStep"
                type="text"
                value={currentStep.description}
                onChange={(e) => handleChange(e)}
                placeholder="Step" /> 

            <input type="button" name="AddStep" value="AddStep" onClick={Adder}/>
                
                {input.stepBYstep.map((el,i) => (
                  <div key={i}>
                    <label htmlFor={i}>Step {i + 1}</label>
                    <input 
                          name="stepBYstep"
                          id={i}a
                          type='text'
                          value={el}
                          onChange={(e) => handleStepsChange(e)} />
                    <button id={i+'a'} onClick={(e) => Deleter(e)}> x </button>
                  </div>
                ))}
            
            {allDiets.map((diet) => {
              return (
                <div key={diet}>
                  <label htmlFor='diets'>{diet}</label>
                <input
                type='checkbox'
                name='diets'
                value={input.name}
                onChange={(e) => handleChange(e)}  />
                </div>
                
              )
            })}

              <input
                name="diets"
                type="text"
                value={input.name}
                onChange={(e) => handleChange(e)}
                placeholder="New diet" />

              <input
                name="image"
                type="text"
                value={input.name}
                onChange={(e) => validateImage(e)}
                placeholder="Insert url" />

            {!error ? null : <div>{error}</div>}
            <input type="submit" value="Add Recipe" />
        </form>
        </div>

    )
}