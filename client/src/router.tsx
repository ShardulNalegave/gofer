
import {
  Route,
  redirect,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { validateToken } from "./authUtils";
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";

const checkAuth = async (authRequired: boolean) => {
  try {
    await validateToken();
    if (!authRequired) return redirect('/dashboard');
  } catch (err: any) {
    if (authRequired) return redirect('/login');
  }
  return null;
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route path="login" element={ <Login /> } loader={checkAuth.bind(this, false)} />
      <Route path="dashboard" element={ <Dashboard /> } loader={checkAuth.bind(this, true)} />
      <Route path="calendar" element={ <Calendar /> } loader={checkAuth.bind(this, true)} />
      <Route path="tasks" element={ <Tasks /> } loader={checkAuth.bind(this, true)} />
      <Route path="projects" element={ <Projects /> } loader={checkAuth.bind(this, true)} />
      <Route path="settings" element={ <Settings /> } loader={checkAuth.bind(this, true)} />
    </Route>
  ),
);

export const routesCompleteUI = ['/dashboard', '/calendar', '/settings', '/tasks', '/projects'];