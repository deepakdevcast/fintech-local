import { useState } from "react"
import { Navigate } from "react-router-dom";

function Home() {
  const [isSignIn, ] = useState(false);
  return (
    <>
    {isSignIn ? <Navigate replace to={'/'}/> : <Navigate replace to={'/signin'}/>} 
    </>
  )
}

export default Home