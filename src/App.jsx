import React from 'react'

import Hero from './components/Hero';
import Demo from './components/Demo';
import News from './components/News';
import Contact from './components/Contact';
import './App.css';

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient'></div>
      </div>

      <div className='app'>
        <Hero />
        <News />
        <Demo />
        {/* <Contact /> */}
      </div>
    </main>
  )
}

export default App
