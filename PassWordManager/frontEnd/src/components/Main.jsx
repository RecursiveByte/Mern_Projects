import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Footer from './Footer'

const Main = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [formArray, setFormArray] = useState([])
  const showRef = useRef("");
  const passRef = useRef("password");

  const url = "https://fullstackprojects-backend0.onrender.com"

   const close = "./images/close.png"
   const open = "./images/open.png"
  
  function showPass() {
    console.log("showpass clicked")
    console.log(showRef.current.src)
    if (showRef.current.src.includes("open.png")) {

      showRef.current.src = close
      passRef.current.type = "password"
      showRef.current.alt = "hide"
      
    }
    else {

      showRef.current.src = open
      passRef.current.type = "text"
      showRef.current.alt = "show"
    }
  }

  const getPass = async () => {
    let res = await fetch(url)
    let data = await res.json()
    setFormArray(data)
  }

  function handleEdit(item) {
    console.log("edit is clicked");
    setForm({ site: item.site, username: item.username, password: item.password })
  }

  useEffect(() => {

    getPass()
  }, [])

  async function handleClick(e) {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
    getPass()
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>


      <h1 className='text-center font-bold text-3xl my-4 text-black-600' >Welcome to keyGuardian</h1>

      <div className=" w-[100vw] h-[25vh] bg-blue-300  input">
        <form onSubmit={handleClick} className='w-[100%] h-[100%] flex flex-col justify-evenly'>
          <input onChange={handleChange} value={form.site} required name="site" className="bg-white w-[80%]  rounded-xl mx-auto border-2 border-blue-600 block" type="text" placeholder='enter the website name here' />

          <div className=' w-[80%] mx-auto mt-10 flex justify-between'>
            <input onChange={handleChange} value={form.username} required
              maxLength={16} minLength={4}

              pattern="^(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{4,}$"
              title="Username must be at least 4 characters long and include at least one number and one symbol."
              name="username" className="w-[60%] rounded-xl border-2 bg-white border-blue-600 block" type="text"
              placeholder='enter the username' />


            <input onChange={handleChange} value={form.password} required name="password"
              maxLength={16} minLength={4}
              ref={passRef}
              pattern="^(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{4,}$"
              title="Password must be at least 4 characters long and include at least one 
            number and one symbol."
              className="w-[30%] relative right-0 rounded-xl border-2 bg-white border-blue-600 block" type="password"
              placeholder='enter the password' />


            <span onClick={showPass} className='absolute right-40 w-[20px] top-55'><img
              ref={showRef}
              src={close}></img>
            </span>
          </div>





          <button type="submit" className='border-2 border-blue-950 px-1 py-1 w-fit rounded-full flex justify-center  items-center  font-bold mx-auto  h-[4vh]  bg-white'>
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              state="hover-swirl"
              stroke="bold"
              style={{ width: "32px", height: "32px" }}>
            </lord-icon>
            Add</button>

        </form>
      </div>
      <Footer formArray={formArray} handleEdit={handleEdit} getFunc={getPass} />

    </>
  )
}

export default Main
