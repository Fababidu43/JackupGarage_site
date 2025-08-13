import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Areas from './components/Areas';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DiagonalSeparator from './components/DiagonalSeparator';

function App() {
  return (
    <div className="min-h-screen bg-base-900">
      <Header />
      <main>
        <Hero />
        <DiagonalSeparator />
        <Services />
        <DiagonalSeparator reverse />
        <Areas />
        <DiagonalSeparator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;