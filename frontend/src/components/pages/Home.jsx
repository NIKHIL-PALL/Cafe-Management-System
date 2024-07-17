import React, { useContext, useEffect } from 'react'
import { verifyToken } from '../utils/auth';
import { AuthContext } from '../../context/Auth';
import {useNavigate} from "react-router-dom"
function Home() {
const auth = useContext(AuthContext);
const navigate = useNavigate();
  useEffect(()=> {
    const token = localStorage.getItem('token');

    if(verifyToken(token)) {
      auth.login(token,"user");
    }else{
      navigate("/");
    }
  },[])
  
  return (
    <React.Fragment>
      <h1>Home Page</h1>
        
    </React.Fragment>
  )
}

export default Home