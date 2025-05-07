
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Task/Home'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Task/Login';
import Signup from './pages/Task/Signup';


// import Signup from './pages/Signup'

function App() {
 
  return (
    <>
    <Routes>
   
    <Route path='/' element={<Login />}/>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/home' element={<Home />}/>
    </Routes>
    <ToastContainer position='top-right' autoClose={3000}/>
   
    


    </>
  )
}

export default App
