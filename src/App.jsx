import React, { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Home from './components/Home/home';
import About from './components/About/about';
import Contact from './components/Contact/contact';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';

function App() {

  const routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        {
          path: "home", element: <ProtectedRoutes><Home /></ProtectedRoutes>
        },
        {
          path: "product-details/:id", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes>
        },
        {
          path: "about", element: <ProtectedRoutes><About /></ProtectedRoutes>
        },
        {
          path: "contact", element: <ProtectedRoutes><Contact /></ProtectedRoutes>
        },
        {
          path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes>
        },
        {
          path: "register", element: <Register />
        },
        {
          path: "login", element: <Login />
        },
        {
          path: "*", element: <NotFoundPage />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
