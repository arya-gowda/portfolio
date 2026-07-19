import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ProjectCard({ title, description, image, tools, url }) {
  return (
    <div className="bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 h-full rounded-3xl shadow-md hover:scale-103 transition-transform hover:shadow-lg duration-300">
      <img src={image} alt={title} loading="lazy" className=" h-40 w-full object-cover rounded-t-3xl" />
      <div className="p-4">
        <div className='flex w-full justify-between'>
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          {url && (
            <a href={url} aria-label={`View ${title} on GitHub`} className="text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              <FaGithub size={24}/>
            </a>
          )}
        </div>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {tools.map((tool, i) => (
            <span key={i} className="border-violet-500 dark:border-violet-400 border-2 text-violet-700 dark:text-violet-400 text-xs px-2 py-1 rounded-full font-bold">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
