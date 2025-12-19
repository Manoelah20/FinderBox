import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase"; // ajuste conforme seu alias
import { Spinner } from "react-bootstrap";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
