import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './routes/App.jsx'
import Projects from './routes/Projects.jsx'
import Mint from './routes/Mint.jsx'
import Resume from './routes/Resume.jsx'

const Router = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <App />,
        },
        {
          path: "projects",
          element: <Projects />,
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

    return <RouterProvider router={router} />;
}

export default Router