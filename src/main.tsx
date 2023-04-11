import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './css/destyle.min.css'
import './css/base.css'
import './css/index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import GenomeList from './routes/GenomeList'
import ProjectList from './routes/ProjectList'
import Root from './routes/Root'

interface MicrobiomeMode {
  mode: 'project' | 'genome'
}

export const projectLoader = (): MicrobiomeMode => {
  return { mode: 'project' }
}
export const genomeLoader = (): MicrobiomeMode => {
  return { mode: 'genome' }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        loader: () => {
          return redirect('/projects')
        },
      },
      {
        path: '/projects',
        element: <ProjectList />,
        loader: projectLoader,
      },
      {
        path: '/genomes',
        element: <GenomeList />,
        loader: genomeLoader,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
