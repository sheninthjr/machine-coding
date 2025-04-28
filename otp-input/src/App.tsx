import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import './App.css'

const INPUT_SIZE = 5

function App() {
  
  const [inputArr,setInputArr] = useState<string[]>(new Array(INPUT_SIZE).fill(''))
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRef.current[0]?.focus()
  },[])

  const handleOnChange = (value:string,index:number) => {
    if(isNaN(Number(value))) return;
    const newValue = value.trim()
    const newArr = [...inputArr]
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr)
    newValue && inputRef.current[index+1]?.focus();
  }

  const onKeyDownEvent = (e: KeyboardEvent<HTMLInputElement>,index:number) => {
    if(!e.currentTarget.value && e.key === "Backspace") {
      inputRef.current[index-1]?.focus()
    }
  }

  return(
    <>
      <h1>OTP Validation</h1>
      {inputArr.map((_,index) => {
        return <input 
          key={index}
          value={inputArr[index]}
          className='otp-input'
          onChange={(e) => handleOnChange(e.target.value,index)}
          ref={(el) => {inputRef.current[index] = el}}
          onKeyDown={(e) => onKeyDownEvent(e,index)}
        />
      })}
    </>
  )
}

export default App
