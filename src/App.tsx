import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceArea from './components/ServiceArea';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';

function App() {
  return (
    <div className="min-h-screen pb-16 md:pb-0 font-body">
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}

export default App;