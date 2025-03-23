import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import  Navbar  from './components/Navbar'
import Home from './pages/Home'
import React from 'react'
import Contact from './pages/Contact'
import About from './pages/About'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/about' element={<About />} />
    </Routes>
    </>
  );
}

export default App;
