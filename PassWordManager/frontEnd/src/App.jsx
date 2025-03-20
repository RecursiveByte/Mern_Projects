
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'


function  App() {

  // let res = await fetch("http//localhost:3000");
  return (
    <>
      <div className="bg-red-500 text-white "> Welcome to my website</div>
      
      <Navbar/>
      <Main/>
    </>
  )
}

export default App
