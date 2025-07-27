import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => {
          return (
            <motion.div 
              className='flex flex-col h-full' key={idx}
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tools={project.tools}
                url={project.url}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
