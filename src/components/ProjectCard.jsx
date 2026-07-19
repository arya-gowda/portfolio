import { FaGithub } from 'react-icons/fa';

export default function ProjectCard({ title, description, image, tools, url }) {
  return (
    <div className="group bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 h-full rounded-3xl shadow-md overflow-hidden hover:-translate-y-1 hover:border-violet-400 dark:hover:border-violet-400 hover:shadow-xl transition-all duration-300 ease-out">
      <div className="h-40 w-full overflow-hidden">
        <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
      </div>
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
