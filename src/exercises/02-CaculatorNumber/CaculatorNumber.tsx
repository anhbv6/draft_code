import React, { useEffect, useRef, useState } from 'react'
import './CaculatorNumber.css';
import Icon from '../../components/Icon';
import { dataBtn, type dataBtnType } from './typeCalculator';

const CaculatorNumber = () => {
  const inputFocus = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const binaryOperators = ["+", "-", "*", "/"] as const;
  type BinaryOperator = typeof binaryOperators[number];

  const handleBinaryOperator = (operator: BinaryOperator) => {
    setInputValue((prev) => {
      if (!prev) {
        if (operator === "+" || operator === "-") {
          return operator;
        }

        return prev;
      }

      const lastChar = prev[prev.length - 1];

      if (lastChar === ".") {
        return prev;
      }
      
      if (binaryOperators.includes(lastChar as BinaryOperator)) {
        const isOnlyPrefixOperator = prev.length === 1 && (prev === "+" || prev === "-");
        const isMultiplyOrDivide = operator === "*" || operator === "/";

        if (isOnlyPrefixOperator && isMultiplyOrDivide) {
          return prev;
        }
        return prev.slice(0, -1) + operator;
      }
      return prev + operator;
    })
  }

  const handleDecimal = () => {
    setInputValue((prev) => {
      if (!prev) return "0.";

      const lastChar = prev[prev.length - 1];
      if (binaryOperators.includes(lastChar as BinaryOperator)) {
        return prev + "0.";
      }

      const parts = prev.split(/[+\-*/]/);
      console.log("parts", parts);
      
      const currentNumber = parts[parts.length - 1];
      console.log("currentNumber", currentNumber);

      if (currentNumber.includes(".")) {
        return prev;
      }

      return prev + ".";
    })
  }

  const handleAction = (data: dataBtnType) => {
    if (data.value === "clear") {
      setInputValue('');
      setResult(0);
      return;
    }
    if (data.value === "calculate") {
      calculatorNumber(inputValue);
    }
  }

  const handleNumber = (data: number) => {
    setResult(0);
    setInputValue((prev) => prev + data.toString())
  }

  const handleAddParentheses = () => {

  }

  const handleUnaryOperator = (unaryOperator: any) => {

  }

  const handleDeleteValue = () => {
    setInputValue(prev => prev.slice(0, -1));
    setResult(0);
  }

  const calculatorNumber = (expression: string) => {
    if (!expression) return;
    const lastChar = expression[expression.length - 1];

    if (
      binaryOperators.includes(lastChar as BinaryOperator) ||
      lastChar === "."
    ) {
      return;
    }

    if (expression[0] === "-" || expression[0] === "+") {
      expression = "0" + expression;
    }

    const numberList = expression.split(/[+\-*/]/).map(Number);
    const operatorList = expression.match(/[+\-*/]/g) || [];

    for (let i = 0; i < operatorList.length; i++) {
      if (operatorList[i] === "*" || operatorList[i] === "/") {
        const currentResult =
          operatorList[i] === "*"
            ? numberList[i] * numberList[i + 1]
            : numberList[i] / numberList[i + 1];

        numberList.splice(i, 2, currentResult);
        operatorList.splice(i, 1);

        i--;
      }
    }

    let total = numberList[0];
    
    for (let i = 0; i < operatorList.length; i++) {
      if (operatorList[i] === "+") {
        total += numberList[i + 1];
      }

      if (operatorList[i] === "-") {
        total -= numberList[i + 1];
      }
    }

    setResult(total);
  }

  const handlePressButton = (btn: dataBtnType) => {
    switch (btn.type) {
      case "number":
        handleNumber(btn.value as number)
        return;
      case "binaryOperator":
        handleBinaryOperator(btn.value as BinaryOperator)
        return;
      case "decimal":
        handleDecimal();
        return;
      case "action":
        handleAction(btn)
        return;
      case "parentheses":
        handleAddParentheses();
        return;
      case "unaryOperator":
        handleUnaryOperator(btn.value);
        return;
    }
  }

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    const el = inputFocus.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollLeft = el.scrollWidth;
      })
    }
  }, [inputValue]);

  return (
    <>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
      }}>
        <div style={{
          padding: '40px 20px',
          borderRadius: '14px',
          background: mode === true ? '#151515' : '#FFFFFF',
          color: mode === true ? '#FAFAFA' : '#4E4D4D',
          width: '390px',
          height: '750px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '250px',
            borderBottom: '1px solid #aaa',
            paddingBottom: '12px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              paddingBottom: '8px',
            }}>
              <input
                value={inputValue}
                onChange={(e) => {

                  setInputValue(e.target.value)
                }}
                ref={inputFocus}
                className='inputCustomCal'
                style={{
                  background: mode === true ? '#151515' : '',
                  color: mode === true ? '#FAFAFA' : '#151515',
                }}
              />
              <span style={{
                alignSelf: 'flex-end',
                fontSize: '48px',
                color: '#969696',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
                width: '100%',
              }}>{result === null ? "" : String(result)}</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <div style={{
                cursor: 'pointer',
              }}>
                <Icon name='history' size={24}/>
              </div>
              <div 
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={handleDeleteValue}
              >
                <Icon name='delete' size={24}/>
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '12px',
            flex: 1,
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              height: '100%',
              gap: '20px',
            }}>
              {dataBtn.map(item => (
                <span 
                  style={{
                    userSelect: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '8px',
                    background: item.label === 'C' ? '#FF5959' : mode === true ? '#343434' : '#F0F0F0',
                    fontSize: '26px',
                    color: item.type === "binaryOperator" ? mode === false ? "#343434" : "#66FF7F" : mode === true ? "#FAFAFA" : "#4E4D4D" ,
                  }}
                  onClick={() => handlePressButton(item)}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          cursor: 'pointer',
        }}
      >
        <Icon 
          name={mode === false ? 'night' : 'day'} 
          onClick={() => setMode(prev => !prev)}
        />
      </div>
    </>
  )
}

export default CaculatorNumber