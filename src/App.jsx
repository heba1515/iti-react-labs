import React, { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Home from './components/Home/home';
import About from './components/About/about';
import Contact from './components/Contact/contact';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

function App() {

  const routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        {
          path: "home", element: <Home />
        },
        {
          path: "about", element: <About />
        },
        {
          path: "contact", element: <Contact />
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
