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
import MyCars from './components/pages/car/MyCars.jsx'
import AddCar from './components/pages/car/AddCar.jsx'
import AddRoda from './components/pages/car/AddRoda.jsx'
import EditCar from './components/pages/car/EditCar.jsx'
import EditRoda from './components/pages/car/EditRoda.jsx'
import CarDetail from './components/pages/car/CarDetail.jsx'
import MyBuyers from './components/pages/car/MyBuyers.jsx'
import Opcoes from './components/pages/Opcoes.jsx'
import Rodas from './components/pages/Rodas.jsx'
import RodaDetail from './components/pages/car/RodaDetail.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Opcoes/>
      },
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/rodas",
        element: <Rodas/>
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
        path:"/rodas/add",
        element: <AddRoda/>
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
        path:"/rodas/:id",
        element: <RodaDetail/>
      },
      {
        path:"/cars/edit/:id",
        element: <EditCar/>
      },
      {
        path:"/rodas/edit/:id",
        element: <EditRoda/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
