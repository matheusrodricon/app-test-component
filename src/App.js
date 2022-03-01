import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const defaultValue = { alt: 0, lar: 0}
  const [arrValues, setArrValues] = useState([defaultValue])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = arrValues.reduce((acc, {alt, lar}) => acc += alt * lar, 0)
    setTotal(newTotal)
  }, [arrValues])

  const updateFieldChanged = index => e => {
    let newArr = [...arrValues] 
    let newValue = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)

    newArr[index] = {
      ...arrValues[index],
      [e.target.name]:  newValue
    }

    setArrValues(newArr)
  }
  
  const deleteArea = indexOfArray => {
    if(indexOfArray > 0) {
      const newArr = [...arrValues].filter((val, index) => index !== indexOfArray)
      setArrValues(newArr)
    }
  }

  const addMoreInput = () => {
    setArrValues(prevArray => [
      ...prevArray,
      defaultValue
    ])
  }

  return (
    <div className="App">
      <div>
        {
          !!arrValues.length && arrValues.map((item, index) => (
            <div key={index}>
              <input placeholder="largura" onChange={updateFieldChanged(index)} value={!!item.alt ? item.alt : ''} type="number" name="alt" min="0" max="100"/>
              <input placeholder="comprimento" onChange={updateFieldChanged(index)} value={item.lar ? item.lar : ''} type="number" name="lar" min="0" max="100"/>
              <span>{item.alt * item.lar} m2</span>
              <button onClick={() => deleteArea(index)}>Limpar</button>
            </div>
          ))
        }
        <button onClick={addMoreInput}>Adicionar área</button>
      </div>
      {
        <p>Total:  {total}</p>
      }
    </div>
  );
}

export default App;
