
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
}
 from "react-router-dom"
 import Dashboard from "./Components/Dashboard"
 import Login from "./Components/login"
 import SignUp from "./Components/signUp"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/Dashboard",
      element: <Dashboard />
    },
    {
      path: "/Signup",
      element: <SignUp/>
    },
  ]);


  return <RouterProvider router={router}/>
  
}

export default App;
