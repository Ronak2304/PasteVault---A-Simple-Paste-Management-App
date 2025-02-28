import { createBrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Pastes from './components/pastes';
import ViewPaste from './components/ViewPaste';
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <div>
        <div className='m-4'>
          <Navbar />
          <Home />
        </div>
      </div>,
  },
  {
    path: "/pastes",
    element: 
      <div className='m-4'>
        <Navbar />
        <Pastes />
      </div>,
  },
  {
    path: "/pastes/:id",
    element: 
      <div className='m-4'>
        <Navbar />
        <ViewPaste />
      </div>,
  },
]);


const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
