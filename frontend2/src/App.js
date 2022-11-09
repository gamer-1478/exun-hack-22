import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router'
import { Home } from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import NavigationBar from './components/Navbar';
import { Register } from './pages/Register';
import Store from './pages/Store';

function App() {

  return (
    <div className="App">
      <Router>
        <div style={{ minHeight: '78.1vh' }}>
          <NavigationBar />
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/store'} element={<Store />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
