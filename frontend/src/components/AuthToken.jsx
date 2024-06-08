/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { verifyToken } from "../api";
import { useNavigate } from "react-router-dom";

function AuthProvider({children}) {
  const navigate = useNavigate();
  useEffect(() => {
    verifyToken().then((isSign) => {
      if (!isSign) {
        navigate('/signin', {replace: true});
      }
    });
  }, [])
  return (
      <>{children}</>
  )
}

export default AuthProvider