import React from "react";

const Search = ({
  searchName,
  setSearchName,
  searchGrade,
  setSearchGrade,
  gradeLevels,
}) => (
  <div className="flex gap-4 my-4">
    <input
      type="text"
      placeholder="Search by name"
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
      className="border-white text-gray-100 w-[10rem] px-3 py-2 rounded md:w-[15rem] lg:w-[20rem] xl:w-[25rem] 2xl:w-[30rem] focus:outline-none focus:ring-2 focus:ring-[#B89B5E] focus:border-transparent"
    />
    <select
      value={searchGrade}
      onChange={(e) => setSearchGrade(e.target.value)}
      className="border-white text-gray-100 w-[10rem] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#B89B5E] focus:border-transparent"
    >
      <option value="">All Grades</option>
      {gradeLevels.map((level) => (
        <option
          key={level}
          value={level}
        >
          {level}
        </option>
      ))}
    </select>
  </div>
);

export default Search;
