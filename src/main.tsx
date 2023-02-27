import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './css/destyle.min.css'
import './css/base.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Index from './routes/Index'
import Show from './routes/Show'
import Header from "./components/Header"
import Footer from "./components/Footer"
import SideMenu from "./components/SideMenu"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/show',
    element: <Show />
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header/>
    <div className="app-wrapper">
      <SideMenu />
      <RouterProvider router={router} />
    </div>
    <Footer/>
  </React.StrictMode>,
)
