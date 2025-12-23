import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Calculator.css'

const Calculator = () => {
  const navigate = useNavigate()
  const calculatorRef = useRef<HTMLDivElement>(null);
  const [exp, setExp] = useState('');
  const [res, setRes] = useState(0);
  const [err, setErr] = useState('');
  const [lastWasResult, setLastWasResult] = useState(false);

  const appendExp = (value) => {
    if (err.length > 0) {
      setErr('');
    }

    if (lastWasResult) {
      if (/[0-9]/.test(value)) {
        setExp(value);
        setRes(0);
        setLastWasResult(false);
      }
      return;
    }

    setExp((e) => e + value);
  };

  const appendOperator = (operator) => {
    if (err.length > 0) {
      setErr('');
    }

    if (lastWasResult) {
      setExp(res.toString() + operator);
      setLastWasResult(false);
      return;
    }

    if (!exp) return;

    setExp((e) => {
      if (/[+\-*/%]$/.test(e)) {
        return e.slice(0, -1) + operator;
      } else {
        return e + operator;
      }
    });
  };

  const appendDecimal = () => {
    if (err.length > 0) {
      setErr('');
    }

    if (lastWasResult) {
      setExp('0.');
      setLastWasResult(false);
      return;
    }

    setExp((e) => {
      if (!e) return '0.';

      const lastNum = e.split(/[+\-*/%]/).pop();
      if (lastNum && !lastNum.includes('.')) {
        return e + '.';
      }
      return e;
    });
  };

  const prependExp = () => {
    if (err.length > 0) {
      setErr('');
    }

    if (lastWasResult) {
      setRes((r) => -r);
      return;
    }

    if (!exp) return;

    setExp((e) => {
      if (e.startsWith('-')) {
        return e.slice(1);
      } else {
        return '-' + e;
      }
    });
  };

  const clear = () => {
    setExp('');
    setRes(0);
    setErr('');
    setLastWasResult(false);
    calculatorRef.current?.focus();
  };

  const calculate = () => {
    setExp((currentExp) => {
      if (!currentExp.trim()) {
        setErr('Enter an expression');
        return currentExp;
      }

      try {
        if (/[+\-*/%]$/.test(currentExp)) {
          setErr('Expression cannot end with operator');
          return currentExp;
        }

        if (/\/\s*0(?![0-9])/.test(currentExp)) {
          setErr('Cannot divide by zero');
          return currentExp;
        }

        const result = eval(currentExp);

        if (!isFinite(result)) {
          setErr('Invalid result');
          return currentExp;
        }

        setRes(Math.round(result * 1000000000) / 1000000000);
        setErr('');
        setLastWasResult(true);
        calculatorRef.current?.focus();

        return '';
      } catch (e) {
        setErr('Invalid Expression');
        setRes(0);
        return currentExp;
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (/[0-9]/.test(e.key)) {
        appendExp(e.key);
      } else if (['+', '*', '/', '%'].includes(e.key)) {
        appendOperator(e.key);
      } else if (e.key === '-') {
        appendOperator('-');
      } else if (e.key === '.') {
        appendDecimal();
      } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
      } else if (e.key === 'Backspace') {
        setExp((e) => e.slice(0, -1));
      } else if (e.key === 'Escape') {
        clear();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [appendExp, appendOperator, appendDecimal, calculate, clear]);

  return (
    <div className='calculator' ref={calculatorRef} tabIndex={0}>
      <div className='main-container'>
        <div className={(err.length === 0) ? 'title' : 'Error'}>
          <button onClick={() => navigate('/')} className='back-btn'>
            ← Back to Projects
          </button>
          {(err.length === 0) ? 'Avinash\'s Calculator' : err}
        </div>
        <div className='display-container'>{exp.length === 0 ? res : exp}</div>
        <div className='buttons-container'>
          <div className='btn-row'>
            <div className='btn btn-clear' onClick={() => clear()}>CLR</div>
            <div className='btn' onClick={() => prependExp()}>+/-</div>
            <div className='btn' onClick={() => appendOperator('%')}>%</div>
            <div className='btn btn-operator' onClick={() => appendOperator('/')}>/</div>
          </div>
          <div className='btn-row'>
            <div className='btn' onClick={() => appendExp('7')}>7</div>
            <div className='btn' onClick={() => appendExp('8')}>8</div>
            <div className='btn' onClick={() => appendExp('9')}>9</div>
            <div className='btn btn-operator' onClick={() => appendOperator('*')}>*</div>
          </div>
          <div className='btn-row'>
            <div className='btn' onClick={() => appendExp('4')}>4</div>
            <div className='btn' onClick={() => appendExp('5')}>5</div>
            <div className='btn' onClick={() => appendExp('6')}>6</div>
            <div className='btn btn-operator' onClick={() => appendOperator('-')}>−</div>
          </div>
          <div className='btn-row'>
            <div className='btn' onClick={() => appendExp('1')}>1</div>
            <div className='btn' onClick={() => appendExp('2')}>2</div>
            <div className='btn' onClick={() => appendExp('3')}>3</div>
            <div className='btn btn-operator' onClick={() => appendOperator('+')}>+</div>
          </div>
          <div className='btn-row'>
            <div className='btn btn-span-2' onClick={() => appendExp('0')}>0</div>
            <div className='btn' onClick={() => appendDecimal()}>.</div>
            <div className='btn btn-equals' onClick={() => calculate()}>=</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator;