import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Calculator = () => {
  const navigate = useNavigate()
  const calculatorRef = useRef(null);
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
    <div
      ref={calculatorRef}
      tabIndex={0}
      className="w-screen min-h-screen flex items-center justify-center"
    >
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 shadow-2xl">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-2 rounded-md text-sm font-semibold shadow-md hover:-translate-y-1 transition-transform"
        >
          ← Projects
        </button>

        <div className="text-center">
          <h2 className={`text-xl md:text-2xl font-bold ${err.length === 0 ? 'text-slate-100' : 'text-red-400'}`}>
            {err.length === 0 ? "Avinash's Calculator" : err}
          </h2>
          <p className="text-sm text-slate-400 mt-1">Keyboard support • Esc to clear • Enter to evaluate</p>
        </div>

        <div className="mt-6">
          <div className="w-full h-28 md:h-32 bg-[#0f172a] rounded-lg p-4 text-2xl md:text-4xl font-semibold text-right text-slate-100 shadow-inner flex items-center justify-end overflow-hidden">
            {exp.length === 0 ? res : exp}
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <button onClick={() => clear()} className="col-span-1 bg-gradient-to-br from-red-500 to-red-400 text-white rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">CLR</button>
            <button onClick={() => prependExp()} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">+/-</button>
            <button onClick={() => appendOperator('%')} className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-white rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">%</button>
            <button onClick={() => appendOperator('/')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">/</button>

            <button onClick={() => appendExp('7')} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">7</button>
            <button onClick={() => appendExp('8')} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">8</button>
            <button onClick={() => appendExp('9')} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">9</button>
            <button onClick={() => appendOperator('*')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">*</button>

            <button onClick={() => appendExp('4')} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">4</button>
            <button onClick={() => appendExp('5')} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">5</button>
            <button onClick={() => appendExp('6')} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">6</button>
            <button onClick={() => appendOperator('-')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">−</button>

            <button onClick={() => appendExp('1')} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">1</button>
            <button onClick={() => appendExp('2')} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">2</button>
            <button onClick={() => appendExp('3')} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">3</button>
            <button onClick={() => appendOperator('+')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">+</button>

            <button onClick={() => appendExp('0')} className="col-span-2 bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">0</button>
            <button onClick={() => appendDecimal()} className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-100 rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">.</button>
            <button onClick={() => calculate()} className="bg-gradient-to-r from-cyan-500 to-blue-400 text-white rounded-lg py-3 text-lg font-semibold shadow hover:-translate-y-1 transition-transform">=</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator;