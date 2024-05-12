import { Navigate } from "react-router-dom";

function Home() {
  return (
    <>
    <Navigate replace to={'/dashboard'}/>
    </>
  )
}

export default Home