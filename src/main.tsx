import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './css/destyle.min.css'
import './css/base.css'
import './css/index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import SideMenu from './components/SideMenu'
import GenomeList from './routes/GenomeList'
import ProjectList from './routes/ProjectList'
import Root from './routes/Root'
import Show from './routes/Show'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    /*loader: async () => {
      return redirect('/projects')
    },*/
    children: [
      {
        path: 'projects',
        element: <ProjectList />,
      },
      {
        path: 'genomes',
        element: <GenomeList />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
