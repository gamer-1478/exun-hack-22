import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Landing />} >
      <Route path="/login" element={<Login />} />
    </Route>
    
  )
);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
