import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculator from './components/Basic Calculator/Calculator.js';
import WeatherDashboard from './components/Weather Dashboard/WeatherDashboard.js';
import ProjectsGrid from './components/Projects Grid/ProjectsGrid.js';
import ReactLogo from './assets/react.svg';
import './App.css';

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
      tech: ['React', 'TypeScript', 'State Management', 'API Integration'],
      path: '/',
      component: <WeatherDashboard />
    }
  ]

  return (
    <Router>
      <div className='app-container'>
        <header className='header'>
          <img src={ReactLogo} alt="React Logo" className='logo' />
          <div className='header-content'>
            <h1>Avinash Shukla's React Learning Projects</h1>
            <p>Exploring React concepts through practical projects</p>
          </div>
        </header>

        <main className='main-content'>
          <Routes>
            <Route path="/" element={<ProjectsGrid projects={projects} />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/weather" element={<WeatherDashboard />} />
          </Routes>
        </main>

        <footer className='footer'>
          <p>&copy; 2025 React Learning Projects. Built with React & TypeScript</p>
        </footer>
      </div>
    </Router>
  )
}

export default App