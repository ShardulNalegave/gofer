
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={ <Login /> } />
      <Route path="dashboard" element={ <Dashboard /> } />
    </>
  ),
);