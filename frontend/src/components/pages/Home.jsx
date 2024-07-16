import React, { useState } from 'react'
import SignUp from '../utils/SignUp';
import Navbar from '../Navbar.jsx';
import Login from '../utils/Login.jsx';
import ForgotPassword from '../ForgotPassword.jsx';
import Sidebar from '../Sidebar.jsx';
function Home() {
    const [showDialog, setShowDialog] = useState("");
    const [open, setOpen] = useState(true);
  return (
    <React.Fragment>
        <Navbar setShowDialog = {setShowDialog} open={open} setOpen={setOpen} />
        {showDialog === "signup" && <SignUp setShowDialog ={setShowDialog} />}
        {showDialog === "login"  && <Login setShowDialog={setShowDialog}  />}
        {showDialog === "forgotPassword"  && <ForgotPassword setShowDialog={setShowDialog} />}
        <Sidebar open={open} setOpen={setOpen} />
    </React.Fragment>
  )
}

export default Home