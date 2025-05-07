import axios from "axios";

const getData = async () => {   
  
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    try {
      const res = await axios.get(backendUrl + "/getData",{withCredentials:true});

      return res.data;

    } catch (error) {
        console.log(error.message );
        return {success:false,message:error.message}
    }
  }


    export default getData;

