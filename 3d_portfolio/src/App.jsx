import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";

import "./App.css";

function App() {
  return (
    <div  className="">
      <header>
        <Navbar />
      </header>
      <main>
        <Hero/>
        <About/>
        <Projects/>
        <Contact/>
      </main>
    </div>
  );
}

export default App;
