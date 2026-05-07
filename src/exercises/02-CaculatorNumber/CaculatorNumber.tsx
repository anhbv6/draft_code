import React, { useEffect, useRef, useState } from 'react'
import './CaculatorNumber.css';
import Icon from '../../components/Icon';
import { dataBtn, type dataBtnType } from './typeCalculator';
import { Tooltip } from 'antd';
import { binaryOperators, convertPercentForCalculate, findLastNumberRange, findLastParenthesesRange, type BinaryOperator } from './constants';

const CaculatorNumber = () => {
  const inputFocus = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [historyCalculator, setHistoryCalculator] = useState<any>([])
  const [showHistory, setShowHistory] = useState(false);
  type UnaryOperator = "percent" | "toggleSign";

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

      if (lastChar === ")" || lastChar === "%") {
        return prev;
      }

      if (binaryOperators.includes(lastChar as BinaryOperator)) {
        return prev + "0.";
      }

      const parts = prev.split(/[+\-*/()]/);
      const currentNumber = parts[parts.length - 1];

      if (currentNumber.includes(".")) {
        return prev;
      }

      return prev + ".";
    });
  };

  const handleAction = (data: dataBtnType) => {
    if (data.value === "clear") {
      setInputValue('');
      setResult(null);
      return;
    }
    if (data.value === "calculate") {
      calculatorNumber(inputValue);
    }
  }

  const handleNumber = (data: number) => {
    setResult(null);
    setInputValue((prev) => {
      if (!prev) return data.toString();

      const lastChar = prev[prev.length - 1];
      if (lastChar === ")") {
        return prev;
      }

      return prev + data.toString();
    })
  }

  const handleAddParentheses = () => {
    setInputValue((prev) => {
      if (!prev) return "(";

      const lastChar = prev[prev.length - 1];

      // if (lastChar === ".") {
      //   return prev;
      // }

      const openCount = (prev.match(/\(/g) || []).length;
      const closeCount = (prev.match(/\)/g) || []).length;

      if (binaryOperators.includes(lastChar as BinaryOperator) || lastChar === "(") {
        return prev + "(";
      }

      if (openCount > closeCount && /[0-9)]/.test(lastChar)) {
        return prev + ")";
      }
      
      return prev;
    })
  }

  const handleUnaryOperator = (unaryOperator: UnaryOperator) => {
    setResult(null);

    setInputValue((prev) => {
      if (!prev) return prev;
      const lastChar = prev[prev.length - 1];

      if (
        binaryOperators.includes(lastChar as BinaryOperator) ||
        lastChar === "(" ||
        lastChar === "."
      ) {
        return prev;
      }

      if (unaryOperator === "percent") {
        if (lastChar === "%") {
          return prev;
        }

        if (lastChar === ")") {
          return prev + "%";
        }

        const numberRange = findLastNumberRange(prev);

        if (!numberRange) return prev;

        return prev + "%";
      }

      if (unaryOperator === "toggleSign") {
        if (lastChar === ")") {
          const parenthesesRange = findLastParenthesesRange(prev);
          if (!parenthesesRange) return prev;

          const before = prev.slice(0, parenthesesRange.start);
          const group = parenthesesRange.value;
          const beforeLastChar = before[before.length - 1];

          if (!before) {
            return "-" + group;
          }

          if (before === "-") {
            return "+" + group;
          }

          if (before === "+") {
            return "-" + group;
          }

          if (beforeLastChar === "+") {
            return before.slice(0, -1) + "-" + group;
          }
          
          if (beforeLastChar === "-") {
            return before.slice(0, -1) + "+" + group;
          }

          if (beforeLastChar === "*" || beforeLastChar === "/") {
            return before + "-" + group;
          }

          return prev;
        }

        const numberRange = findLastNumberRange(prev);
        if (!numberRange) return prev;

        const before = prev.slice(0, numberRange.start);
        const currentNumber = numberRange.value;
        const after = prev.slice(numberRange.end);

        if (!before && !currentNumber.startsWith("-") && !currentNumber.startsWith("+")) {
          return "-" + currentNumber + after;
        }

        if (!before && currentNumber.startsWith("-")) {
          return "+" + currentNumber.slice(1) + after;
        }

        if (!before && currentNumber.startsWith("+")) {
          return "-" + currentNumber.slice(1) + after;
        }

        if (currentNumber.startsWith("-")) {
          return before + "+" + currentNumber.slice(1) + after;
        }

        if (currentNumber.startsWith("+")) {
          return before + "-" + currentNumber.slice(1) + after;
        }

        const beforeLastChar = before[before.length - 1];

        if (beforeLastChar === "+") {
          return before.slice(0, -1) + "-" + currentNumber + after;
        }

        if (beforeLastChar === "-") {
          return before.slice(0, -1) + "+" + currentNumber + after;
        }

        if (beforeLastChar === "*" || beforeLastChar === "/") {
          return before + "-" + currentNumber + after;
        }

        return prev;
      }
      return prev;
    })
  }

  const handleDeleteValue = () => {
    setInputValue(prev => prev.slice(0, -1));
    setResult(null);
  }

  const calculatorNumber = (expression: string) => {
    if (!expression) return;

    const lastChar = expression[expression.length - 1];

    if (
      binaryOperators.includes(lastChar as BinaryOperator) ||
      lastChar === "." ||
      lastChar === "("
    ) {
      return;
    }

    const openCount = (expression.match(/\(/g) || []).length;
    const closeCount = (expression.match(/\)/g) || []).length;

    if (openCount !== closeCount) {
      return;
    }

    const isSafeExpression = /^[0-9+\-*/().%\s]+$/.test(expression);

    if (!isSafeExpression) return;

    const calculateExpression = convertPercentForCalculate(expression);

    try {
      const total = Function(`"use strict"; return (${calculateExpression})`)();

      if (typeof total !== "number" || Number.isNaN(total)) {
        return;
      }

      setResult(total);
      const problem = {
        operation: calculateExpression,
        resultData: total
      }
      setHistoryCalculator((prev: any) => {
        const newHistory = [...prev, problem];
        sessionStorage.setItem('historyCal', JSON.stringify(newHistory))
        return newHistory;
      })
    } catch {
      return;
    }
  };

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
        handleUnaryOperator(btn.value as UnaryOperator);
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

  useEffect(() => {
    const data = sessionStorage.getItem('historyCal');
    if (data) {
      setHistoryCalculator(JSON.parse(data));
    }
  }, []);

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
              <Tooltip placement="bottom" title={inputValue}>
                <input
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      '0','1','2','3','4','5','6','7','8','9',
                      '+','-','*','/','.','(',')',
                      'Backspace','Delete','ArrowLeft','ArrowRight','Tab'
                    ];

                    if (e.ctrlKey || e.metaKey) return;

                    if (!allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  ref={inputFocus}
                  className='inputCustomCal'
                  style={{
                    background: mode === true ? '#151515' : '',
                    color: mode === true ? '#FAFAFA' : '#151515',
                  }}
                />
              </Tooltip>
              <Tooltip placement="bottom" title={result === null ? "" : String(result)}>
                <span style={{
                  alignSelf: 'flex-end',
                  fontSize: '48px',
                  color: '#969696',
                  overflow: 'hidden',
                  display: 'flex',
                  width: 'auto',
                }}>
                  <div
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>{result === null ? "" : String(result)}</div></span>
              </Tooltip>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'relative',
            }}>
              <div style={{
                  cursor: 'pointer',
                }}
                onClick={() => setShowHistory(prev => !prev)}
              >
                <Icon name='history' size={24}/>
              </div>
              {showHistory && <div className='tableHistory'>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    padding: '8px',
                    borderBottom: '1px solid #aaa',
                  }}>
                    <div></div>
                    <div style={{justifySelf: 'center', fontWeight: 600}}>History</div>
                    <div style={{justifySelf: 'end', fontWeight: 400}}>Clear</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '4px',
                  }}>
                    {historyCalculator.map((item: any) => {
                      return (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'end',
                        }}>
                          <span>{item.operation}</span>
                          <span>= {item.resultData}</span>
                        </div>
                      )
                    })}
                  </div>
              </div>}
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