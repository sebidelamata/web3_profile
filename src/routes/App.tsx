import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import CrtOverlay from '../components/CrtOverlay'
import Terminal from '../components/Terminal'
import GhostOverlay from '../components/GhostOverlay'
import ScanlineOverlay from '../components/ScanlineOverlay'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CrtOverlay />
      <GhostOverlay />
      <ScanlineOverlay />
      <Navbar />
      <main className="mx-auto w-full max-w-content flex-1 px-5">
        <section id="hero">
          <Hero />
        </section>
        <section id="projects-section" className="border-t border-border py-14">
          <Terminal onRequestPlainList={() => {}} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App