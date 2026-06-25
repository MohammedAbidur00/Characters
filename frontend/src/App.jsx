import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet, useNavigate, Navigate } from "react-router-dom";
import './App.css'
import './material-icons.css'

function ProtectedRoute({ isLoggedIn, isLoading, children }) {
  if (isLoading) {
    return (
      <div>
        <p>LOADING...</p>
      </div>
    )
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }
  return children
}

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

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMsbBoxVisibile, setIsMsgBoxVisible] = useState("Hide");
  const [message, setMessage] = useState("");

  function handleSignIn() {
    if (email.trim().length === 0 || password.trim().length === 0) {
      setIsMsgBoxVisible("");
      setMessage("make sure all fields are complete");
      setTimeout(() => setIsMsgBoxVisible("Hide"), 2000)
    } else {
      const payload = {
        email: email,
        password: password
      }

      fetch("http://localhost:3000/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) {
            const message =
              data.error ||
              (data.errors && Object.values(data.errors).flat()[0]) ||
              "Login failed";
            throw new Error(message);
          }
          return data;
        });
      })
      .then(() => {
        setEmail("");
        setPassword("");
        setIsLoggedIn(true)
        setMessage("signed in successfully...")
        setIsMsgBoxVisible("")
        setTimeout(() => setIsMsgBoxVisible("Hide"), 2000)
        setTimeout(() => navigate('/'), 2000)
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.message)
        setIsMsgBoxVisible("")
        setTimeout(() => setIsMsgBoxVisible("Hide"), 2000)
      })
    }
  }

  function MessageBox({ type }) {
    return (
      <div className={`Message-Box ${type}`}>
        <p>{message}</p>
      </div>
    )
  }

  return (
    <div className="Login-Wrapper">
      <div className="Login-Heading-Container">
        <h1>SIGN IN</h1>
      </div>
      <div className="Login-Inputs-Container">
        <div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter your email"></input>
        </div>
        <div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password"></input>
        </div>
      </div>
      {MessageBox({ type: isMsbBoxVisibile })}
      <div className="Login-Btn-Container">
        <div>
          <button onClick={handleSignIn}>Sign in</button>
        </div>
        <div>
          <p onClick={() => navigate("/register")}>sign up here to make an account</p>
        </div>
      </div>
    </div>
  )
}

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isMsbBoxVisibile, setIsMsgBoxVisible] = useState("Hide");
  const [message, setMessage] = useState("");

  function handleSignUp() {
    if (username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || verifyPassword.trim().length === 0) {
      setIsMsgBoxVisible("");
      setMessage("make sure all fields are complete");
      setTimeout(() => setIsMsgBoxVisible("Hide"), 2000)
    } else {
      const payload = {
        username: username,
        email: email.toLowerCase(),
        password: password
      }

      fetch("http://localhost:3000/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res.json()
      })
      .then(() => {
        setUsername("")
        setEmail("")
        setPassword("")
        setVerifyPassword("")
        setMessage("signed up successfully")
        setIsMsgBoxVisible("")
        setTimeout(() => setIsMsgBoxVisible("Hide"), 2000)
        setTimeout(() => navigate('/'), 2000)
      })
      .catch((err) => {
        console.log(err)
        setMessage("something went wrong")
        setIsMsgBoxVisible("")
        setTimeout(() => setIsMsgBoxVisible("Hide"), 2000)
      })
    }
  }

  function MessageBox({ type }) {
    return (
      <div className={`Message-Box ${type}`}>
        <p>{message}</p>
      </div>
    )
  }
  
  return (
    <div className="Login-Wrapper">
      <div className="Login-Heading-Container">
        <h1>SIGN UP</h1>
      </div>
      <div className="Login-Inputs-Container">
        <div>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter a username"></input>
        </div>
        <div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter an email"></input>
        </div>
        <div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter a password"></input>
        </div>
        <div>
          <input value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} type="password" placeholder="Verify your password"></input>
        </div>
      </div>
      {MessageBox({ type: isMsbBoxVisibile })}
      <div className="Login-Btn-Container">
        <div>
          <button onClick={() => handleSignUp()}>Sign up</button>
        </div>
        <div>
          <p onClick={() => navigate("/login")}>sign in here if you have an account</p>
        </div>
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
          <button onClick={() => navigate("/specificcharacters")}>CHARACTERS</button>
          <button onClick={() => navigate("/specificfamilies")}>FAMILIES</button>
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/auth/me", {
      credentials: 'include'
    })
    .then((res) => {
      setIsLoggedIn(res.ok);
    })
    .catch(() => {
      setIsLoggedIn(false);
    })
    .finally(() => {
      setisLoading(false);
    })
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading}>
               <HomePage />
            </ProtectedRoute>
          }>
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
