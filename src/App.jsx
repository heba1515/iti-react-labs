import React, { lazy, Suspense, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/layout';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';

function App() {

  const Home = lazy(()=>import('./components/Home/home'))
  const About = lazy(()=>import('./components/About/about'))
  const Contact = lazy(()=>import('./components/Contact/contact'))
  const ProductDetails = lazy(()=>import('./components/ProductDetails/ProductDetails'))
  const Register = lazy(()=>import('./components/Register/Register'))
  const Login = lazy(()=>import('./components/Login/Login'))
  const Cart = lazy(()=>import('./components/Cart/Cart'))
  const NotFoundPage = lazy(()=>import('./components/NotFoundPage/NotFoundPage'))

  const routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        {
          path: "home", element: <Suspense><ProtectedRoutes><Home /></ProtectedRoutes></Suspense>
        },
        {
          path: "product-details/:id", element: <Suspense><ProtectedRoutes><ProductDetails /></ProtectedRoutes></Suspense>
        },
        {
          path: "about", element: <Suspense><ProtectedRoutes><About /></ProtectedRoutes></Suspense>
        },
        {
          path: "contact", element: <Suspense><ProtectedRoutes><Contact /></ProtectedRoutes></Suspense>
        },
        {
          path: "cart", element: <Suspense><ProtectedRoutes><Cart /></ProtectedRoutes></Suspense>
        },
        {
          path: "register", element: <Suspense><Register /></Suspense>
        },
        {
          path: "login", element: <Suspense><Login /></Suspense>
        },
        {
          path: "*", element: <Suspense><NotFoundPage /></Suspense>
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
