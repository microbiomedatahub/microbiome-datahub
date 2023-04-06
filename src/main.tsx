import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './css/destyle.min.css'
import './css/base.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import SideMenu from './components/SideMenu'
import GenomeList from './routes/GenomeList'
import Index from './routes/Index'
import ProjectList from './routes/ProjectList'
import Show from './routes/Show'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/projects',
    element: <ProjectList />,
  },
  {
    path: '/genomes',
    element: <GenomeList />,
  },
  {
    path: '/projects/:projectId',
    element: <Show />,
  },
  {
    path: '/genomes/:genomeId',
    element: <Show />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <div className='app-wrapper'>
      <SideMenu />
      <RouterProvider router={router} />
    </div>
    <Footer />
  </React.StrictMode>,
)
