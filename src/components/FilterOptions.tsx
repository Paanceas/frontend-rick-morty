import React from "react";

interface FilterOptionsProps {
  gender: string;
  species: string;
  setGender: (gender: string) => void;
  setSpecies: (species: string) => void;
  onApplyFilter: () => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  gender,
  species,
  setGender,
  setSpecies,
  onApplyFilter,
}) => {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-full z-10">
      <div className="mb-4">
        <h3 className="text-gray-600 mb-2">Gender</h3>
        <div className="flex space-x-2 w-full">
          {["all", "Male", "Female"].map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 rounded-lg px-4 py-2 ${
                gender === g
                  ? "bg-primary100 text-primary700"
                  : "bg-white text-gray-900 border border-gray-300"
              }`}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-gray-600 mb-2">Species</h3>
        <div className="flex space-x-2 w-full">
          {["all", "Human", "Alien"].map((s) => (
            <button
              key={s}
              onClick={() => setSpecies(s)}
              className={`flex-1 rounded-lg px-4 py-2 ${
                species === s
                  ? "bg-primary100 text-primary700"
                  : "bg-white text-gray-900 border border-gray-300"
              }`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={onApplyFilter}
        className="bg-primary600 text-white rounded-lg px-4 py-2 w-full">
        Filter
      </button>
    </div>
  );
};

export default FilterOptions;
