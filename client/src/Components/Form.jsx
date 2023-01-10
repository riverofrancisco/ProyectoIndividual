import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getDiets } from '../actions/actions';
import './Form.css'


export default function Form(){
const history = useHistory();
const dispatch = useDispatch();

  //// STATES //////
const allDiets = useSelector((state) => state.diets);

useEffect(()=>{
  if(allDiets.length === 0){
    dispatch(getDiets())}
}, [dispatch])

const [input, setInput] = useState({
    title: '',
    summary: '',
    healthScore: 0,
    stepBYstep: [],
    diets: [],
    image: '',
})
const [currentStep, setCurrentStep] = useState({description: ''});
const [newDiet, setNewDiet] = useState({name: ''})
const [error, setError] = useState(' ');


//// VALIDATIONS ///////
function validateHS(e) {//Numero entre 1 y 100
    const {value, name} = e.target;
    
    if(value > 100 || value <= 0) {
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

  function validateTyS(e) {//No puede tener simbolos.
    const {value, name} = e.target;

    if(!value) {
      setError('Falta enviar datos obligatorios')
    } else if (name === 'title'){
        if('condition' === 0){
          console.log(`${value} no cumple con el TitLe`)
          setError('El titulo debe contener sólo letras y/o números');
        } else {setInput({
                          ...input,
                          [name] : value})};
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
    } else if (name === 'newDiet') {
            setNewDiet({
              name: value.toLowerCase()
            })
    } else {
            setInput({...input,
              [name]: value
            });
    } 
};

//// DINAMIC INPUTS ////////
const handleStepsChange = (event) => {
  const steps = [...input.stepBYstep];
  steps[event.target.id] = event.target.value;

  setInput({
    ...input,
    stepBYstep: steps
  })
}

const handleDietChange = (event) => {
  const selecteDiets = [...input.diets];
  selecteDiets[event.target.id] = event.target.value;

  setInput({
    ...input,
    diets: selecteDiets
  })
}

const Adder = (event) => {
  const {name, value} = event.target;
  if (name === 'AddStep') {
    var step = currentStep;
    setInput({
      ...input,
      stepBYstep: [...input.stepBYstep , step.description]
    });
    setCurrentStep({description: ''})

  } else if (name === 'AddDiet') {
    var diet = newDiet;
    setInput({
      ...input,
      diets: [...input.diets , diet.name]
    });
    setNewDiet({name: ''})
  } else if (name === 'AddExDiet') {
    setInput({
      ...input,
      diets: [...input.diets , value]
    })  
  }
}

const Deleter = (e) => {
  e.preventDefault();
  const {name, value, id} = e.target;
  console.log(id);
  if(name === 'step'){
      const tobeDeleted = document.getElementById(`${id[0]}step`);
      console.log(tobeDeleted);
      let steps = [...input.stepBYstep];
      console.log(steps);
      let newSteps = steps.filter((element) => element !== tobeDeleted.value);
      console.log(newSteps);
      setInput({
        ...input,
        stepBYstep: newSteps
      });
    } else if (name === 'diet') {
      const tobeDeleted = document.getElementById(`${id[0]}diet`);
      console.log(tobeDeleted);
      let currentDiets = [...input.diets];
      console.log(currentDiets);
      let newDiets = currentDiets.filter((element) => element !== tobeDeleted.value);
      console.log(newDiets);
      setInput({
        ...input,
        diets: newDiets
      });
  }
  
  
}

//// SUBMIT ///////
const enableSubmit = () => {
  const submitButton = document.getElementById("btnSubmit");
  if(error !== ''){
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
} 

useEffect(() => {
  enableSubmit()
})

const onSubmit = (event) => {
  
  event.preventDefault();
  console.log(input)
  
  fetch('http://localhost:3001/recipes',{
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      "Content-type": "application/json"
    }
  })

  alert(`Recipe "${input.title}" created succesfully.`)
  history.push("/home");

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
                onChange={(e) => validateTyS(e)}
                placeholder="Title" />
             <input
                name="summary"
                type="text"
                value={input.name}
                onChange={(e) => validateTyS(e)}
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
                  <div key={i+'inputStepKey'}>
                    <label htmlFor={i}>Step {i + 1}</label>
                    <input 
                          name="stepBYstep"
                          id={`${i}step`}
                          type='text'
                          value={el}
                          onChange={(e) => handleStepsChange(e)} />
                    <button name='step' id={i+'ST'} onClick={(e) => Deleter(e)}> x </button>
                  </div>
                ))}
            
            <input
                name="newDiet"
                type="text"
                value={newDiet.name}
                onChange={(e) => handleChange(e)}
                placeholder="Diet" /> 
          
            <input type="button" name="AddDiet" value="Add Other Diet" onClick={Adder}/>

            <select name="AddExDiet" onChange={Adder}>
                    <option>--- Select from our Diets</option>
                    {allDiets.map((d,i) => {return (<option key={i+'globalDietKey'} id={`${i}exDiet`} value={d}>{d}</option>)})}
                </select>           
            

            {input.diets.map((el,i) => (
                  <div key={i+'inputDietKey'}>
                    <label htmlFor={i}>Diet {i + 1}</label>
                    <input 
                          name="diets"
                          id={`${i}diet`}
                          type='text'
                          value={el}
                          onChange={(e) => handleDietChange(e)} />
                    <button name='diet' id={i+'DT'} onClick={(e) => Deleter(e)}> x </button>
                  </div>
                ))}

              <input
                name="image"
                type="text"
                value={input.name}
                onChange={(e) => validateImage(e)}
                placeholder="Insert url" />

            {!error ? null : <div>{error}</div>}
            <input id="btnSubmit" type="submit" value="Add Recipe" />
        </form>
        </div>

    )
}