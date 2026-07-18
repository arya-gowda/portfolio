import { MdHome, MdBusinessCenter, MdCode, MdCameraAlt, MdCall, MdMenu, MdClose } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const links = [
  { to: '/', label: 'Home', icon: MdHome },
  { to: '/experience', label: 'Experience', icon: MdBusinessCenter },
  { to: '/projects', label: 'Projects', icon: MdCode },
  { to: '/photography', label: 'Photography', icon: MdCameraAlt },
  { to: '/contact', label: 'Contact', icon: MdCall },
]

export default function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path) => currentPath === path ? 'bg-zinc-700 text-white' : ''

  // Close the mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [currentPath])

  return (
    <nav className="w-full bg-zinc-900 text-white p-3 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-violet-400">AG</Link>

        {/* Desktop links */}
        <div className="hidden sm:flex space-x-2">
          {links.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className={`navlink ${isActive(to)}`}>
              <div className='flex items-center gap-1'>
                <Icon className='text-lg navicon'/>
                {label}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden flex flex-col gap-1 mt-3 pb-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className={`navlink ${isActive(to)}`}>
              <div className='flex items-center gap-1'>
                <Icon className='text-lg navicon'/>
                {label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
