import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ProjectCard({ title, description, image, tools, url }) {
  return (
    <div className="bg-zinc-800 border-2 border-zinc-600 h-full rounded-3xl shadow-md hover:scale-103 transition-transform hover:shadow-lg duration-300">
      <img src={image} alt={title} className=" h-40 w-full object-cover rounded-t-3xl" />
      <div className="p-4">
        <div className='flex w-full justify-between'>
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          {url && (
            <a href={url}><FaGithub size={24}/></a>
          )}
        </div>
        <p className="text-zinc-400">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {tools.map((tool, i) => (
            <span key={i} className="border-violet-400 border-2 text-violet-400 text-xs px-2 py-1 rounded-full font-bold">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
