import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Directory from "./pages/Directory";
import EmployeePage from "./pages/EmployeePage";
import { EmployeeProvider } from "./context/employeeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Directory />,
  },
  {
    path: "/employee/:id",
    element: <EmployeePage />,
  },

]);

const App = () => {
  return (
    <EmployeeProvider>
      <RouterProvider router={router} />
    </EmployeeProvider>
  );
};

export default App;
