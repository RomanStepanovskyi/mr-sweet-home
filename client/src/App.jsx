import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Work from './components/Work.jsx';
import Process from './components/Process.jsx';
import About from './components/About.jsx';
import QuoteForm from './components/QuoteForm.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <About />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
