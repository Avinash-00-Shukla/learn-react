import { Link } from 'react-router-dom';

const ProjectsGrid = ({ projects }) => {
  return (
    <div className='flex flex-wrap justify-center gap-8 w-full max-w-6xl mx-auto'>
      {projects.map((project) => (
        <div key={project.id} className='group flex flex-col bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-96 h-96 p-6 border border-slate-600 hover:border-purple-500'>
          <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3'>{project.name}</h3>
          <p className='text-slate-300 text-sm leading-relaxed flex-grow'>{project.description}</p>
          <div className='flex flex-wrap gap-2 mt-6'>
            {project.tech.map((tech, idx) => (
              <span key={idx} className='bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full px-3 py-1 shadow-md hover:shadow-lg transition-shadow'>{tech}</span>
            ))}
          </div>
          {project.path !== '/' ? (
            <Link to={project.path} className='flex justify-center items-center mt-6 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300 group-hover:translate-y-0'>
              Explore Project →
            </Link>
          ) : <div className='flex justify-center items-center mt-6 py-3 px-6 bg-gradient-to-r from-slate-600 to-slate-700 text-slate-300 font-semibold rounded-lg cursor-not-allowed opacity-75'>
            Coming Soon 🚀
          </div>}
        </div>
      ))}
    </div>
  )
}
export default ProjectsGrid;