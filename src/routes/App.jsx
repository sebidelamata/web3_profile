import { useState, useEffect } from 'react'
import { Navigate } from 'react-router'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TechStackCarousel from '../components/TechStackCarousel'
import ScrollToProjectsCard from '../components/ScrollToProjectsCard'
import Projects from './Projects'

function App() {

  return (
    <div>
        <Navbar></Navbar>
        <section id="hero" className="hero">
          <div className="hero-card">
            <Hero></Hero>
            <TechStackCarousel></TechStackCarousel>
        </div>
      </section>
      <div className='main'>
              <ScrollToProjectsCard></ScrollToProjectsCard>
              <Projects></Projects>
      </div>
    </div>
  )
}

export default App
