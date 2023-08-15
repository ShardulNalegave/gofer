
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
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route path="login" element={ <Login /> } />
      <Route path="dashboard" element={ <Dashboard /> } />
      <Route path="calendar" element={ <Calendar /> } />
      <Route path="tasks" element={ <Tasks /> } />
      <Route path="projects" element={ <Projects /> } />
      <Route path="settings" element={ <Settings /> } />
    </Route>
  ),
);

export const routesCompleteUI = ['/dashboard', '/calendar', '/settings', '/tasks', '/projects'];

export const authProtectedRoutes = ['/dashboard', '/calendar', '/settings', '/tasks', '/projects'];
export const authUnprotectedRoute = ['/login'];