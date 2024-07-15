import React, { useState } from 'react'
import SignUp from '../utils/SignUp';
import Navbar from '../Navbar.jsx';
import Login from '../utils/Login.jsx';
function Home() {
    const [showDialog, setShowDialog] = useState(false);
    const [showLoginDialog, setShowLoginDialog] = useState(false);
  return (
    <React.Fragment>
        <Navbar setShowDialog = {setShowDialog} setShowLoginDialog = {setShowLoginDialog}/>
        {showDialog && <SignUp setShowDialog = {setShowDialog}/>}
        {showLoginDialog && <Login setShowLoginDialog ={setShowLoginDialog} />}
    </React.Fragment>
  )
}

export default Home