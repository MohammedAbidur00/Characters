import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet, useNavigate} from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import './material-icons.css'

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="Wrapper">
      <div className='Header-Container'>
        <div className='Header-Title-Container Home-Title'>
          <h1>HOME</h1>
        </div>
        <div className='Header-Btns-Container'>
          <button onClick={() => navigate("/")}>ALL</button>
          <button onClick={() => navigate("/male")}>MALE</button>
          <button onClick={() => navigate("/female")}>FEMALE</button>
          <button onClick={() => navigate("/specific")}>SPECIFIC</button>
          <button onClick={() => navigate("/add")}>ADD</button>
          <button className='material-icons'>star</button>
        </div>
      </div>
      <div className="Wrapper-Content">
        <Outlet />
      </div>
    </div>
  )
}

function AllPage() {
  return (
    <div>
      <div>
        <h1>All</h1>
      </div>
    </div>
  )
}

function MalePage() {
  return (
    <div>
      <div>
        <h1>MALE</h1>
      </div>
    </div>
  )
}

function FemalePage() {
  return (
    <div>
      <div>
        <h1>FEMALE</h1>
      </div>
    </div>
  )
}

function SpecificPage() {
  const navigate = useNavigate()

  return (
    <div className="Wrapper">
      <div className='Header-Container'>
        <div className='Header-Title-Container'>
          <div className="Header-Back-Btn-Container">
            <button onClick={() => navigate(-1)}>BACK</button>
          </div>
          <h1>SPECIFIC</h1>
        </div>
        <div className='Header-Btns-Container'>
          <button onClick={() => navigate("/characters")}>CHARACTERS</button>
          <button onClick={() => navigate("/families")}>FAMILIES</button>
          <button className='material-icons'>star</button>
        </div>
      </div>
      <div className="Wrapper-Content">
        <Outlet />
      </div>
    </div>
  )
}

function AddPage() {
  const navigate = useNavigate()

  return (
    <div className="Wrapper">
      <div className='Header-Container'>
        <div className='Header-Title-Container'>
          <div className="Header-Back-Btn-Container">
            <button onClick={() => navigate(-1)}>BACK</button>
          </div>
          <h1>ADD</h1>
        </div>
      </div>
      <div className="Wrapper-Content">
        <Outlet />
      </div>
    </div>
  )
}

function SpecificCharactersPage() {
  return (
    <></>
  )
}

function SpecificFamiliesPage() {
  return (
    <></>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
        <Route index element={<AllPage />} />
          <Route path="male" element={<MalePage />} />
          <Route path="female" element={<FemalePage />} />
        </Route>
        <Route path="/specific" element={<SpecificPage />}>
          <Route path="specificcharacters" element={<SpecificCharactersPage />} />
          <Route path="specificfamilies" element={<SpecificFamiliesPage />} />
        </Route>
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
