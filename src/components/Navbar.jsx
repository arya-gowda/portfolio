import { MdHome, MdBusinessCenter, MdCode, MdCameraAlt, MdCall, MdMenu, MdClose, MdLightMode, MdDarkMode } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

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
  const { theme, toggleTheme } = useTheme()

  const isActive = (path) => currentPath === path ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white' : ''

  // Close the mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [currentPath])

  const ThemeToggleButton = ({ className = '' }) => (
    <button
      onClick={toggleTheme}
      className={`text-xl text-zinc-600 dark:text-zinc-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
    </button>
  )

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-3 shadow transition-colors">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-violet-600 dark:text-violet-400">AG</Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center space-x-2">
          {links.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className={`navlink ${isActive(to)}`}>
              <div className='flex items-center gap-1'>
                <Icon className='text-lg navicon'/>
                {label}
              </div>
            </Link>
          ))}
          <ThemeToggleButton className="ml-2" />
        </div>

        {/* Mobile controls */}
        <div className="sm:hidden flex items-center gap-3">
          <ThemeToggleButton />
          <button
            className="text-2xl"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
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
