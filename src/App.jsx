import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./components/login";
import Register from './components/register';
import Navbar from './components/navbar';
import ForgetPassword from './components/forgetPassword';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ResetPassword from './components/resetPassword' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Router>
    <Navbar/>
     <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path="/reset-password"  element={<ResetPassword/>} />
     
     </Routes>
    </Router>

   
  )
}

export default App
