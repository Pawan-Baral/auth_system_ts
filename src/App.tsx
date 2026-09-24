

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'

import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';

function App() {


  return (<>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
