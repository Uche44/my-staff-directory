import React from "react";
import { useParams } from "react-router-dom";
import { useEmployeeContext } from "../context/employeeContext";
import EmployeeForm from "../components/EmployeeForm";

const EmployeePage = () => {
  const { id } = useParams();
  const { employees, isFormOpen, setIsFormOpen } = useEmployeeContext();

  // Find the employee by id
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return <div>Employee not found.</div>;
  }

  const handleEdit = () => {
    setIsFormOpen(true);
  };

  return (
    <section className="w-full h-screen px-6 py-8 bg-black/80 text-gray-100">
      {isFormOpen && <EmployeeForm initialData={employee} />}

      {/* <div className="w-full"> */}
        <h1 className="text-4xl font-bold text-[#B89B5E] border-b-1 border-[#B89B5E] mb-4 py-4">
          {employee.name}
        </h1>

<h2 className="text-[#B89B5E]/95 font-bold  text-right my-4">ID: {employee.id}</h2>

      {/* </div> */}
      <table className="min-w-[300px] bg-white text-black rounded shadow mb-4">
        <tbody>
          <tr>
            <td className="font-semibold px-4 py-2">Country</td>
            <td className="px-4 py-2">{employee.country}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">State</td>
            <td className="px-4 py-2">{employee.state}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">Address</td>
            <td className="px-4 py-2">{employee.address}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">Role</td>
            <td className="px-4 py-2">{employee.role}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">Department</td>
            <td className="px-4 py-2">{employee.department}</td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={handleEdit}
        className="bg-[#B89B5E] text-black/60 font-semibold py-2 px-4 rounded hover:bg-[#A78B4D] transition"
      >
        Edit
      </button>
    </section>
  );
};

export default EmployeePage;
