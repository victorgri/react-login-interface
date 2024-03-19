import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './components/Login/Login';
import './App.css';
import { Forgot } from './components/Forgot/Forgot';
import { Reset } from './components/Reset/Reset';

function App() {


  return (
    <BrowserRouter>
      <>
        <img className="logo" src="./logo.svg" alt="logo" />
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/forgot" element={<Forgot />}/>
          <Route path="/reset" element={<Reset />}/>
        </Routes>
      </>
    </BrowserRouter>

  )
}

export default App
