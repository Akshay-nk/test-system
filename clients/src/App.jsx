import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Quiz from './pages/Quiz'
import { Route, Routes } from 'react-router'
import Result from './pages/Result'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/quiz' element={<Quiz/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/home'  element={<Home/>}/>


     </Routes>
    </>
  )
}

export default App
