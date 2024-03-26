import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import App from './routes/App'
import Mint from './routes/Mint'
import Resume from './routes/Resume'
import Blog from './routes/Blog'
import { EthersProvider } from './EthersProvider'

const Router: React.FC = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/mint",
          element: <Mint />,
        },
        {
          path: "/resume",
          element: <Resume />,
        },
    ]);

    return(
        <EthersProvider>
            <RouterProvider router={router} />
        </EthersProvider>
    )
}

export default Router