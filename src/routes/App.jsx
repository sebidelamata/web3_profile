import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar.tsx'
import Hero from '../components/Hero.tsx'
import TechStackCarousel from '../components/TechStackCarousel.tsx'
import ScrollToProjectsCard from '../components/ScrollToProjectsCard'
import Projects from './Projects'
import Contacts from '../components/Contacts'
import ScrollTopButton from '../components/ScrollTopButton'
import Footer from '../components/Footer.tsx'

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
              <Contacts></Contacts>
              <ScrollTopButton></ScrollTopButton>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
