
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <App /> }>
      <Route path="login" element={ <Login /> } />
      <Route path="dashboard" element={ <Dashboard /> } />
    </Route>
  ),
);

export const routesCompleteUI = ['/dashboard'];