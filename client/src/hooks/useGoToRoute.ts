
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { authProtectedRoutes, authUnprotectedRoute } from "../router";

export const goToRoute = async (route: string) => {
  const authData = useAuth();
  const navigate = useNavigate();

  await authData.validate();

  if (authProtectedRoutes.includes(route)) {
    if (authData.isAuth) navigate(route);
    else if (!authData.isAuth) navigate('/login');
  } else if (authUnprotectedRoute.includes(route)) {
    if (!authData.isAuth) navigate(route);
    else if (authData.isAuth) navigate('/dashboard');
  }
}

export function useGoToRoute() {
  return goToRoute;
}