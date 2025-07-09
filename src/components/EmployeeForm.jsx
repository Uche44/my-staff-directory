import React, { useEffect, useState } from "react";
import { roles, departments } from "../lib/employeeDetails";
import { useEmployeeContext } from "../context/employeeContext";

const countriesApiUrl =
  "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

const EmployeeForm = ({ initialData }) => {
  const { setEmployees, setIsFormOpen } = useEmployeeContext();

  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      country: "",
      state: "",
      address: "",
      role: "",
      department: "",
      gradeLevel: "",
    }
  );
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const res = await fetch(countriesApiUrl);
        const data = await res.json();
        // Build a map
        const countryMap = {};
        data.forEach((item) => {
          if (!countryMap[item.country]) {
            countryMap[item.country] = new Set();
          }
          if (item.subcountry) {
            countryMap[item.country].add(item.subcountry);
          }
        });

        const countryList = Object.entries(countryMap).map(
          ([name, statesSet]) => ({
            name,
            states: Array.from(statesSet).sort(),
          })
        );
        setCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)));
      } catch {
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.gradeLevel) newErrors.gradeLevel = "Grade Level is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
    if (name === "country") {
      const selected = countries.find((c) => c.name === value);
      setStates(selected ? selected.states : []);
      setFormData((prev) => ({ ...prev, state: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      let updatedEmployees;
      if (initialData) {
        // Edit mode
        updatedEmployees = employees.map((emp) =>
          emp.id === initialData.id ? { ...emp, ...formData } : emp
        );
      } else {
       
        let newId;
        do {
          newId = Math.random().toString(36).substr(2, 4);
        } while (employees.some((emp) => emp.id === newId));
        const newEmployee = {
          ...formData,
          id: newId,
        };
        updatedEmployees = [...employees, newEmployee];
        console.log("New Employee Added:", newEmployee);
      }
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
      
      setFormData({
        name: "",
        country: "",
        state: "",
        address: "",
        role: "",
        department: "",
        gradeLevel: "",
      });
      setIsFormOpen(false);
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-black/80 fixed top-0 left- z-1000">
      <form
        className="max-w-lg mx-auto p-8 bg-[#B89B5E] rounded shadow space-y-6"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-2xl font-bold mb-4">Employee Details</h2>

        {/* Name */}
        <div>
          <label
            className="md:block font-medium mb-1 hidden"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            id="name"
            name="name"
            placeholder="Enter Employee name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label
            className="md:block hidden font-medium mb-1"
            htmlFor="country"
          >
            Country
          </label>
          <select
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={loadingCountries}
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option
                key={c.code}
                value={c.name}
              >
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label
            className="md:block hidden  font-medium mb-1"
            htmlFor="state"
          >
            State
          </label>
          <select
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled={!formData.country || states.length === 0}
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label
            className="md:block hidden  font-medium mb-1"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            id="address"
            name="address"
            placeholder="Enter Employee address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label
            className="md:block hidden font-medium mb-1"
            htmlFor="role"
          >
            Role
          </label>
          <select
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select role</option>
            {roles.map((role) => (
              <option
                key={role}
                value={role}
              >
                {role}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label
            className="md:block hidden font-medium mb-1"
            htmlFor="department"
          >
            Department
          </label>
          <select
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.department ? "border-red-500" : "border-gray-300"
            }`}
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">{errors.department}</p>
          )}
        </div>

        {/* Grade Level */}
        <div>
          <label
            htmlFor="gradeLevel"
            className="md:block hidden font-medium mb-1"
          >
            Grade Level
          </label>
          <select
            id="gradeLevel"
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none ${
              errors.gradeLevel ? "border-red-500" : "border-gray-300"
            }`}

          >
            <option value="">Select grade level</option>
            <option value="Entry">Entry Level</option>
            <option value="Mid">Mid Level</option>
            <option value="Senior">Expert Level</option>
            {/* Add more as needed */}
          </select>
          {errors.gradeLevel && (
            <p className="text-red-500 text-sm mt-1">{errors.gradeLevel}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black/70 text-white py-2 rounded hover:bg-black/80 transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default EmployeeForm;
