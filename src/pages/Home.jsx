import { Link } from 'react-router-dom';
import Headshot from '../assets/Gowda_Arya_Headshot.jpg';
import { SiJavascript, SiPython, SiReact, SiAdobelightroom, SiTypescript, SiHtml5, SiCss3, SiC, SiCplusplus, SiPytorch, SiPandas, SiFlask, SiAngular, SiGit, SiFigma, SiJira, SiTailwindcss, SiVite, SiPostgresql } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaJava } from 'react-icons/fa';

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto px-4'>
      <div className="containter mx-auto flex justify-between mt-20 mb-30 h-80 items-center">
        <div className='mt-20 items-center'>
          <div className="text-8xl font-extrabold">
            <p>Hi, I'm</p>
            <p className="text-violet-400">Arya Gowda</p>
          </div>
          <p className="text-xl mt-4 text-zinc-400 font-bold">Full Stack developer &#128104;&#8205;&#128187; | AI/ML enthusiast &#129504; | Driven by innovation and coding the future &#128640;&#128161;</p>
          <div className='flex gap-4 mt-4'>
            <button className="bg-violet-400 text-white px-5 py-2 rounded-3xl shadow hover:bg-violet-500 transition duration-300">
              <Link to="/projects">Portfolio</Link>
            </button>
            <button 
              onClick={() => window.open("/Arya_Gowda_Resume.pdf", "_blank", "noopener,noreferrer")}
              className='bg-zinc-900 text-white border-2 px-5 py-2 rounded-3xl shadow hover:bg-zinc-800 transition duration-300'
            >
              Resume
            </button>
          </div>
        </div>
        <div>
          <img src={Headshot} alt="Profile" className="rounded-full w-80 h-80 shadow-lg" />
        </div>
      </div>
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-4xl text-center font-bold mb-4 mx-auto">👋 About Me</h2>
        <p className="text-zinc-300 text-xl">
          I'm a senior at the University of Michigan studying Computer Science and Business with a passion for AI/ML, product-building, and creative problem-solving. I love turning ideas into real, impactful projects—especially at the intersection of technology, design, and innovation. Driven by curiosity and a builder's mindset, I'm always exploring new tools, startups, and ways to make tech more human.
        </p>
      </div>
      <div className="p-4 max-w-5xl mx-auto mt-20 text-center">
        <h2 className="text-4xl font-bold mb-4 mx-auto">Tech Stack</h2>
        <p className="text-zinc-300 mb-8">I love working with a variety of technologies to build innovative solutions.</p>
        <div className='flex flex-wrap justify-center gap-4 text-sm'>
          <button className='techstackbutton'>
            <SiPython className='text-xl' />
            Python
          </button>
          <button className='techstackbutton'>
            <SiC className='text-xl' />
            C
          </button>
          <button className='techstackbutton'>
            <SiCplusplus className='text-xl' />
            C++
          </button>
          <button className='techstackbutton'>
            <FaJava className='text-xl' />
            Java
          </button>
          <button className='techstackbutton'>
            <SiJavascript className='text-xl' />
            JavaScript
          </button>
          <button className='techstackbutton'>
            <SiTypescript className='text-xl' />
            TypeScript
          </button>
          <button className='techstackbutton'>
            <SiHtml5 className='text-xl' />
            HTML5
          </button>
          <button className='techstackbutton'>
            <SiCss3 className='text-xl' />
            CSS3
          </button>
          <button className='techstackbutton'>
            <SiTailwindcss className='text-xl' />
            Tailwind
          </button>
          <button className='techstackbutton'>
            <SiVite className='text-xl' />
            Vite
          </button>
          <button className='techstackbutton'>
            <SiReact className='text-xl' />
            React
          </button>
          <button className='techstackbutton'>
            <SiAngular className='text-xl' />
            AngularJS
          </button>
          <button className='techstackbutton'>
            <SiPostgresql className='text-xl' />
            PostgreSQL
          </button>
          <button className='techstackbutton'>
            <SiFlask className='text-xl' />
            Flask
          </button>
          <button className='techstackbutton'>
            <SiPytorch className='text-xl' />
            Pytorch
          </button>
          <button className='techstackbutton'>
            <SiPandas className='text-xl' />
            Pandas
          </button>
          <button className='techstackbutton'>
            <SiGit className='text-xl' />
            Git
          </button>
          <button className='techstackbutton'>
            <VscVscode className='text-xl' />
            VSCode
          </button>
          <button className='techstackbutton'>
            <SiFigma className='text-xl' />
            Figma
          </button>
          <button className='techstackbutton'>
            <SiJira className='text-xl' />
            Jira REST API
          </button>
          <button className='techstackbutton'>
            <SiAdobelightroom className='text-xl' />
            Lightroom
          </button>
        </div>
      </div>
    </div>
  );
}
