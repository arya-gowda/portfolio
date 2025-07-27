import { MdHome, MdBusinessCenter, MdCode, MdCameraAlt, MdCall } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path) => currentPath === path ? 'bg-zinc-700 text-white' : ''

  return (
    <nav className="w-screen bg-zinc-900 text-white p-3 shadow">
      <div className="container mx-auto flex justify-between">
        <h3 className="text-xl font-bold"></h3>
        <div className="space-x-2">
          <Link to="/" className={`navlink ${isActive('/')}`}>
            <div className='flex items-cetner gap-1'>
              <MdHome className='text-lg navicon'/>
              Home
            </div>
          </Link>
          <Link to="/experience" className={`navlink ${isActive('/experience')}`}>
            <div className='flex items-cetner gap-1'>
              <MdBusinessCenter className='text-lg navicon'/>
              Experience
            </div>
          </Link>
          <Link to="/projects" className={`navlink ${isActive('/projects')}`}>
            <div className='flex items-cetner gap-1'>
              <MdCode className='text-lg navicon'/>
              Projects
            </div>
          </Link>
          <Link to="/photography" className={`navlink ${isActive('/photography')}`}>
            <div className='flex items-cetner gap-1'>
              <MdCameraAlt className='text-lg navicon'/>
              Photography
            </div>
          </Link>
          <Link to="/contact" className={`navlink ${isActive('/contact')}`}>
            <div className='flex items-cetner gap-1'>
              <MdCall className='text-lg navicon'/>
              Contact
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
