import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import { Route, Routes } from 'react-router'
import { Home } from './pages/Home.jsx';
import { Login } from './pages/auth/Login.jsx';
import NavigationBar from './components/Navbar';
import { Register } from './pages/auth/Register';
import Store from './pages/Store';
import ItemPage from './pages/Item';
import { logout } from './misc/resuse';
import ProfilePage from './pages/Profile';
import { Community } from './pages/Community/Community';
import { NewPost } from './pages/Community/NewPost';
import { PostPage } from './pages/Community/PostPage';
import { Cart } from './pages/Cart.jsx';

function LogoutPage() {
    logout();
    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    )
}

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
            <Route path={'/store/view/:gameId'} element={<ItemPage />} />
            <Route path={'/store'} element={<Store />} />
            <Route path={'/profile'} element={<ProfilePage/>} />
            <Route path={'/community/:id'} element={<PostPage />} />
            <Route path={'/community'} element={<Community />} />
            <Route path={'/newpost'} element={<NewPost />} />
            <Route path={'/logout'} element={<LogoutPage />} />
            <Route path={'/cart'} element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
