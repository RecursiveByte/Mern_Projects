import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Footer from './Footer'

const Main = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [formArray, setFormArray] = useState([])
  const showRef = useRef("");
  const passRef = useRef("password");

  const url = "https://fullstackprojects-backend0.onrender.com"

   const close = "https://www.google.com/imgres?q=eye%20cloase%20icon&imgurl=https%3A%2F%2Ficons.veryicon.com%2Fpng%2Fo%2Fphotographic%2Fant-design-official-icon-library%2Feye-close-1.png&imgrefurl=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fphotographic%2Fant-design-official-icon-library%2Feye-close-1.html&docid=lKxCsk73DjWX3M&tbnid=Hx4pBSDPNlkhjM&vet=12ahUKEwiU392chJ6LAxXhTGwGHVP4DIAQM3oECBcQAA..i&w=512&h=512&hcb=2&ved=2ahUKEwiU392chJ6LAxXhTGwGHVP4DIAQM3oECBcQAA"
   const open = "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonmonstr.com%2Feye-9-svg%2F&psig=AOvVaw2PWWolBNO0fqNnL51mG0Vs&ust=1738346560844000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPj0m_GDnosDFQAAAAAdAAAAABAE"

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
