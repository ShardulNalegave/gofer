
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route path="login" element={ <Login /> } />
      <Route path="dashboard" element={ <Dashboard /> } />
      <Route path="calendar" element={ <Calendar /> } />
      <Route path="settings" element={ <Settings /> } />
    </Route>
  ),
);

export const routesCompleteUI = ['/dashboard', '/calendar', '/settings'];

export const authProtectedRoutes = ['/dashboard', '/calendar', '/settings'];
export const authUnprotectedRoute = ['/login'];