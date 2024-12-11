import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom"

// pages
import Home from './components/pages/Home.jsx'
import Login from './components/pages/auth/Login.jsx'
import Register from './components/pages/auth/Register.jsx'
import Profile from './components/pages/User/Profile.jsx'
import MyCars from './components/pages/pet/MyCars.jsx'
import AddCar from './components/pages/pet/AddCar.jsx'
import EditCar from './components/pages/pet/EditCar.jsx'
import CarDetail from './components/pages/pet/CarDetail.jsx'
import MyBuyers from './components/pages/pet/MyBuyers.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/user/profile",
        element: <Profile/>
      },
      {
        path:"/cars/mycars",
        element: <MyCars/>
      },
      {
        path:"/cars/add",
        element: <AddCar/>
      },
      {
        path:"/cars/mybuyers",
        element: <MyBuyers/>
      },
      {
        path:"/cars/:id",
        element: <CarDetail/>
      },
      {
        path:"/cars/edit/:id",
        element: <EditCar/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
