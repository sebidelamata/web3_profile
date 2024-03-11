import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TechStackCarousel from '../components/TechStackCarousel'
import ScrollToProjectsCard from '../components/ScrollToProjectsCard'

function App() {

  return (
    <div>
        <Navbar></Navbar>
        <section id="hero" className="hero">
          <div className="hero-card">
            <Hero></Hero>
            <TechStackCarousel></TechStackCarousel>
            <ScrollToProjectsCard></ScrollToProjectsCard>
        </div>
      </section>
    </div>
  )
}

export default App
