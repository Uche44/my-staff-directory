import React, { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useEmployeeContext } from "../context/employeeContext";
import { FaEllipsisH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";

const Directory = () => {
  const { employees, isFormOpen, setIsFormOpen, setEmployees } =
    useEmployeeContext();
  const navigate = useNavigate();
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchGrade, setSearchGrade] = useState("");
  const gradeLevels = ["Entry", "Mid", "Senior"];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchGrade === "" || emp.gradeLevel === searchGrade)
  );

  const handleView = (emp) => {
    navigate(`/employee/${emp.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedEmployees = employees.filter((emp) => emp.id !== id);
      setEmployees(updatedEmployees);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setOpenMenuIdx(null);
    }
  };

  return (
    <>
      <h2 className="text-center bg-black/80 text-gray-100 font-bold text-[2rem] md:text-[3rem] ">
        My Staff DB
      </h2>
      <section className="w-full min-h-screen bg-black/80 text-gray-800 flex flex-col items-center px-4 py-6 md:px-8">
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-[#B89B5E] text-white rounded-md shadow-xl self-end md:mr-4"
        >
          Add Employee
        </button>
        <Search
          searchName={searchName}
          setSearchName={setSearchName}
          searchGrade={searchGrade}
          setSearchGrade={setSearchGrade}
          gradeLevels={gradeLevels}
        />
        {isFormOpen && <EmployeeForm setIsFormOpen={setIsFormOpen} />}

        {filteredEmployees.length > 0 ? (
          <div className="w-full max-w-4xl mx-auto mt-6">
            <table className="w-full bg-white  shadow-md">
              <thead className="bg-[#B89B5E] text-white">
                <tr>
                  <th className="w-10 py-2 md:py-4 md:text-xl">S/N</th>
                  <th className="px-4 py-2 md:py-4 text-left md:text-xl">
                    Employees
                  </th>
                  <th className=""></th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, idx) => (
                  <tr key={emp.id}>
                    <td className="border px-4 py-2">{idx + 1}</td>
                    <td
                      onClick={() => setOpenMenuIdx(false)}
                      className="border-y px-4 py-2 md:text-xl"
                    >
                      {emp.name}
                    </td>

                    <td className="border-y pr-2 py-2 relative">
                      <button
                        className="focus:outline-none md:-ml-2"
                        onClick={() =>
                          setOpenMenuIdx(idx === openMenuIdx ? null : idx)
                        }
                      >
                        <FaEllipsisH className="text-black/80" />
                      </button>
                      {openMenuIdx === idx && (
                        <div className="absolute right-0 mt-2 w-32 bg-[#B89B5E] rounded-lg shadow-lg z-10">
                          <button
                            className="block w-full px-2 py-2 hover:bg-[#B89B5E]/80 text-white"
                            onClick={() => handleView(emp)}
                          >
                            View Details
                          </button>
                          <button
                            className="block w-full py-2 hover:bg-[#B89B5E]/80 text-red-600"
                            onClick={() => handleDelete(emp.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-100 mt-6">
            No Employees yet.
          </p>
        )}
      </section>
    </>
  );
};

export default Directory;
