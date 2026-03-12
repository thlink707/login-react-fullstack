import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(false); // Simulamos que el usuario no está autenticado

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

