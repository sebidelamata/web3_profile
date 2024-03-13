import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './routes/App.jsx'
import Mint from './routes/Mint.jsx'
import Resume from './routes/Resume.jsx'
import Blog from './routes/Blog.jsx'
import { EthersProvider } from './EthersProvider.jsx'

const Router = () => {
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
          path: "mint",
          element: <Mint />,
        },
        {
          path: "resume",
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