import { useState } from 'react';

function App() {
  const [calc, setCalc] = useState("")
  const [result, setResult] = useState("")

  const ops = ['/', '*', '+', '-', '.']

  const updateCalc = (value) => {
    if ((calc === '' && ops.includes(value)) || // if the very first value pressed is an operator
        (ops.includes(value) && ops.includes(calc.slice(-1)))) { // if the value pressed is an operator and the previous value pressed was also an operator
          return
        }
    setCalc(calc + value);

    // if the last value pressed was not an operator
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString())
    }
  }

  const createDigits = () => {
    const digits = []
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button 
          onClick={() => updateCalc(i.toString())}
          key={i}>
          {i}
          </button>
      )
    }
    return digits
  }

  const calculate = () => {
    setCalc(eval(calc).toString())
  }

  const deleteLast = () => {
    if (calc === '') {
      setResult("0")
    }

    // remove the last character of calc state
    setCalc(calc.slice(0, -1))
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({ result })</span> : ''}&nbsp;
          { calc || "0" }
        </div>
        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>

          <button onClick={() => deleteLast()}>DEL</button>
        </div>
        <div className="digits">
        { createDigits() }
        <button onClick={() => updateCalc('0')}>0</button>
        <button onClick={() => updateCalc('.')}>.</button>

        <button onClick={() => calculate()}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
