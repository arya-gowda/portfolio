import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Photography from './pages/Photography';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className='w-full min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-grow scroll-smooth'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/experience' element={<Experience />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/photography' element={<Photography />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
