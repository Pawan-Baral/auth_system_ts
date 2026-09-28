

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'

import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Service from '@/pages/Service';

function App() {


  return (<>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Service />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
