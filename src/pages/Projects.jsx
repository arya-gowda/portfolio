import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { LoadingState, ErrorState } from '../components/LoadingState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const optimizedImageModules = import.meta.glob('../assets/projects/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
  query: { w: '600', format: 'webp', quality: '80' },
});

const optimizedImages = Object.fromEntries(
  Object.entries(optimizedImageModules).map(([path, src]) => [path.split('/').pop(), src])
);

function resolveProjectImage(image) {
  const filename = image.split('/').pop();
  return optimizedImages[filename] || `/${image}`;
}

export default function Projects() {
  useDocumentTitle('Projects');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingState label="Loading projects..." />;
  if (error) return <ErrorState message={`Error loading projects: ${error}`} />;

  return (
    <section aria-labelledby="projects-heading" className="max-w-7xl mx-auto px-6 py-6">
      <h1 id="projects-heading" className="text-4xl font-bold mb-6 text-center">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => {
          return (
            <motion.article
              className='flex flex-col h-full' key={idx}
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={resolveProjectImage(project.image)}
                tools={project.tools}
                url={project.url}
              />
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
