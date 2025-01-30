import React from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Footer = ({ formArray, handleEdit, getFunc }) => {

    async function handleDelete() {

        let value = confirm("Do you  really want to delete")

        if (value) {
            let res = await fetch("https://fullstackprojects-backend0.onrender.com", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }
        getFunc()
    }

    function handleCopy(text) {
        console.log("copy clicked")
        navigator.clipboard.writeText(text);

        toast.success('🦄 Copied to clipboard ', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    return (


        <div>

            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />

            {formArray.length === 0 ? <div className='w-full text-center text-2xl font-bold'>No password</div> : <table className='w-full rounded-md overflow-hidden bg-blue-500 '>
                <caption className='font-bold text-2xl p-2 '>Your Password</caption>
                <thead className=' bg-blue-800 text-white font-bold' >
                    <tr >
                        <th>Site name</th>
                        <th>User name</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center '>{console.log(formArray)}
                    {formArray.map((item, index) => {
                        return <tr key={index}>
                            <td ><div onClick={() => handleCopy(item.site)} className='inline-block  text-1xl'><a>{item.site}</a></div>
                                <span className='border-2 h-4 mx-2  border-white mb-10 '>
                                    <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                    <lord-icon
                                        onClick={() => handleCopy(item.site)}
                                        src="https://cdn.lordicon.com/hmzvkifi.json"
                                        trigger="hover"
                                        stroke="bold"
                                        colors="primary:#000000"
                                        style={{ width: "20px", height: "20px", top: "2px" }}>
                                    </lord-icon>
                                </span></td>
                            <td className=''>
                                <div onClick={() => handleCopy(item.username)} className='inline-block  text-1xl'>{item.username}</div>
                                <span className='border-2 h-4 mx-2 border-white mb-10 '>

                                    <lord-icon
                                        onClick={() => handleCopy(item.username)}
                                        src="https://cdn.lordicon.com/hmzvkifi.json"
                                        trigger="hover"
                                        stroke="bold"
                                        colors="primary:#000000"
                                        style={{ width: "20px", height: "20px", top: "2px" }}>
                                    </lord-icon>
                                </span></td>
                            <td><div onClick={() => handleCopy(item.password)} className='inline-block  text-1xl'>{item.password}</div>
                                <span className='border-2 h-4 mx-2 border-white mb-10 '>

                                    <lord-icon
                                        onClick={() => handleCopy(item.password)}
                                        src="https://cdn.lordicon.com/hmzvkifi.json"
                                        trigger="hover"
                                        stroke="bold"
                                        colors="primary:#000000"
                                        style={{ width: "20px", height: "20px", top: "2px" }}>
                                    </lord-icon>
                                </span></td>
                            <td className='flex justify-center'>
                                <div className='bg-white rounded-sm  border-2 border-black'>
                                    <lord-icon
                                        onClick={() => handleEdit(item)}
                                        src="https://cdn.lordicon.com/exymduqj.json"
                                        trigger="hover"
                                        stroke="bold"
                                        state="hover-line"
                                        colors="primary:#000000,secondary:#08a88a"
                                        style={{
                                            width: "32px"
                                            , height: "32px"
                                        }}>
                                    </lord-icon>
                                </div>
                                <div className='bg-white border-2 border-black'>
                                    <lord-icon
                                        onClick={() => handleDelete()}
                                        src="https://cdn.lordicon.com/hwjcdycb.json"
                                        trigger="click"
                                        stroke="bold"
                                        state="morph-trash-in"
                                        colors="primary:#000000,secondary:#08a88a"
                                        style={{ width: "32px", height: "32px" }}>
                                    </lord-icon>
                                </div>
                            </td>
                        </tr>
                    })}





                </tbody>
            </table>}

        </div>
    )
}

export default Footer
