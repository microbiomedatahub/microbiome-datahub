import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './css/destyle.min.css'
import './css/base.css'
import './css/index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'
import SearchResults from './routes/SearchResults'
import Show, { loadShow } from './routes/Show'

export interface MicrobiomeMode {
  type: 'project' | 'genome'
}

const projectLoader = (): MicrobiomeMode => {
  return { type: 'project' }
}
const genomeLoader = (): MicrobiomeMode => {
  return { type: 'genome' }
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
        element: <SearchResults />,
        loader: projectLoader,
      },
      {
        path: '/genomes',
        element: <SearchResults />,
        loader: genomeLoader,
      },
      {
        path: '/projects/:projectId',
        element: <Show />,
        loader: loadShow,
      },
      {
        path: '/genomes/:genomeId',
        element: <Show />,
        loader: loadShow,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
