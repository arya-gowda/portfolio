import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { Spinner } from './components/LoadingState';

const Home = lazy(() => import('./pages/Home'));
const Experience = lazy(() => import('./pages/Experience'));
const Photography = lazy(() => import('./pages/Photography'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <div className='w-full min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-grow scroll-smooth'>
          <Suspense fallback={<Spinner label="Loading..." />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/experience' element={<Experience />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/photography' element={<Photography />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
