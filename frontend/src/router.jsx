/* eslint-disable react/prop-types */
import {  Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import AuthProvider from "./components/AuthToken";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider>
        <Home />
      </AuthProvider>
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/dashboard",
    element: <AuthProvider><Dashboard /></AuthProvider>,
    errorElement: <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl">Unauthorized! Please SignIn/SignUp!</h1>
      <div>
        <Link to={'/signin'} className="px-4 py-2 rounded-md text-blue-500">Sign In</Link>{' '}
        <Link to={'/signup'} className="px-4 py-2 rounded-md text-blue-500">Sign Up</Link>
      </div>
    </div>
  },
  {
    path: "/transfer",
    element: <SendMoney />,
    errorElement: <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl">Unauthorized! Please SignIn/SignUp!</h1>
      <div>
        <Link to={'/signin'} className="px-4 py-2 rounded-md text-blue-500">Sign In</Link>{' '}
        <Link to={'/signup'} className="px-4 py-2 rounded-md text-blue-500">Sign Up</Link>
      </div>
    </div>
  }
])
function InitRouter() {
  return (
    <RouterProvider router={router}/>
  )
}

export default InitRouter;