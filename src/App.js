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

    newArr[index] = {
      ...arrValues[index],
      [e.target.name]:  parseInt(e.target.value)
    }
    
    setArrValues(newArr)
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
              <label>
                Altura: <input onChange={updateFieldChanged(index)} value={item.alt} type="number" name="alt" min="0" max="100"/>
              </label>
              <label>
                Largura: <input onChange={updateFieldChanged(index)} value={item.lar} type="number" name="lar" min="0" max="100"/>
              </label>
              <span>Subtotal: {item.alt * item.lar} m2</span>
            </div>
          ))
        }
        <button onClick={addMoreInput}>Adicionar outro cômodo</button>
      </div>
      {
        <p>Total:  {total}</p>
      }
    </div>
  );
}

export default App;
