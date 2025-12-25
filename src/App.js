import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculator from './components/Basic Calculator/Calculator.js';
import WeatherDashboard from './components/Weather Dashboard/WeatherDashboard.js';
import ProjectsGrid from './components/Projects Grid/ProjectsGrid.js';
import ReactLogo from './assets/react.svg';

const App = () => {
  const projects = [
    {
      id: 1,
      name: 'Basic Calculator App',
      description: 'A fully functional calculator with keyboard support and error handling',
      tech: ['React', 'TypeScript', 'JavaScript', 'State Management'],
      path: '/calculator',
      component: <Calculator />
    },
    {
      id: 2,
      name: 'Weather Dashboard',
      description: 'A dashboard to process and display weather information using external APIs',
      tech: ['React', 'TypeScript', 'JavaScript', 'State Management', 'API Integration'],
      path: '/',
      component: <WeatherDashboard />
    }
  ]

  return (
    <Router>
      <div className='flex flex-col w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans justify-center min-h-screen'>
        <header className='flex flex-col items-center justify-center py-12 px-4 text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl'>
          <div className='flex items-center gap-6'>
            <img src={ReactLogo} alt="React Logo" className='w-20 hover:scale-110 transition-transform duration-300' />
            <div className='flex flex-col text-center'>
              <h1 className='text-4xl font-bold mb-2'>Avinash Shukla</h1>
              <p className='text-lg text-blue-100'>React Developer | Building Modern Web Experiences</p>
            </div>
          </div>
          <p className='text-blue-50 mt-4 max-w-2xl text-center text-sm'>Crafting elegant, performant solutions with React, TypeScript, and modern web technologies</p>
        </header>

        <div className='flex items-center justify-center flex-grow p-6 md:p-12 w-screen'>
          <Routes>
            <Route path="/" element={<ProjectsGrid projects={projects} />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/weatherDashboard" element={<WeatherDashboard />} />
          </Routes>
        </div>

        <footer className='flex justify-center items-center py-6 px-4 text-slate-300 bg-slate-900 border-t border-slate-700'>
          <p className='text-sm'>&copy; 2025 React Portfolio. Built with <span className='text-red-400'>React</span>, <span className='text-blue-400'>TypeScript</span> & <span className='text-purple-400'>Tailwind CSS</span></p>
        </footer>
      </div>
    </Router>
  )
}

export default App