import { Link } from 'react-router-dom';
import './ProjectsGrid.css';

const ProjectsGrid = ({ projects }: { projects: any[] }) => {
  return (
    <section className='projects-section'>
      {/* <h2>Projects</h2> */}
      <div className='projects-grid'>
        {projects.map((project) => (
          <div key={project.id} className='project-card'>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className='tech-stack'>
              {project.tech.map((tech: string , idx: number) => (
                <span key={idx} className='tech-badge'>{tech}</span>
              ))}
            </div>
            {project.path !== '/' ? (
              <Link to={project.path} className='view-btn'>
                View Project
              </Link>
            ) : <Link to={project.path} className='view-btn'>
                Coming Soon
              </Link>}
          </div>
        ))}
      </div>
    </section>
  )
}
export default ProjectsGrid;