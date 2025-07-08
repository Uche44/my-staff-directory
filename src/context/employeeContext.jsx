import { createContext, useState, useEffect, useContext } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, isFormOpen, setIsFormOpen }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
};
export default EmployeeContext;
