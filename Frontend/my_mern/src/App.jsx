
import React from "react";
import "./App.css";

import {createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import AuthRegLog from './pages/AuthRegLog';
 import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Profile from "./pages/Profile";
import Service from "./pages/Service";
import NotFound from "./pages/NotFound";

// Protected Routes
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";


// Layout
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // login  // register
      {
        index: true,
        element: <Home />,
      },
      {
        path: "authreglog",
        element: <AuthRegLog />,
      },
      {
        path: "service",
        element: (
          <UserRoute>
            <Service />
          </UserRoute>
        ),
      },
      // profile
      {
        path: "profile",
        element: (
          <UserRoute>
            <Profile />
          </UserRoute>
        ),
      },
      // customer records
      {
        path: "customers",
        element: (
          <UserRoute>
            <Customers />
          </UserRoute>
        ),
      },

      // admin dashboard
      {
        path: "dashboard",

        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },

      // page not found
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);



function App() {
  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;    


