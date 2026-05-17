import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import BeforeAfter from './components/BeforeAfter';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <BeforeAfter />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
