import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TechStackCarousel from '../components/TechStackCarousel'
import Projects from './Projects'
import Contacts from '../components/Contacts'
import Footer from '../components/Footer'
import CrtOverlay from '../components/CrtOverlay'
import Terminal from '../components/Terminal'

const App: React.FC = () => {
  return (
    <div>
      <CrtOverlay />
      <Navbar />
      <main className="mx-auto max-w-content px-5">
        <section id="hero">
          <Hero />
          <TechStackCarousel />
        </section>
        <section id="projects-section" className="border-t border-border py-16">
          <Terminal onRequestPlainList={() => {}} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App