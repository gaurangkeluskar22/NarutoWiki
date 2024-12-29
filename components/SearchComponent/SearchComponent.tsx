import _ from "lodash";
import { useCallback } from "react";

interface searchComponentProp {
  setSearchValue: any;
}

const SearchComponent: React.FC<searchComponentProp> = ({ setSearchValue }) => {
  const handleSearch = (value: string) => {
    const searchValue = value.toLowerCase();
    setSearchValue(searchValue);
  };

  const debouncedHandleChange = useCallback(
    _.debounce((value: string) => handleSearch(value), 300),
    [] // Ensures debounce function is created only once
  );
  const handleChange = (e: any) => {
    debouncedHandleChange(e.target.value);
  };

  return (
    <div className="  bg-white px-4 py-2 flex justify-center items-center  rounded-2xl shadow-lg lg:w-7/12 sm:w-full w-12/12 ">
      <input
        type="text"
        className="w-full h-full  outline-none"
        placeholder="Search Character"
        onChange={(e) => handleChange(e)}
      />
      <button className="p-1 bg-orange-600 text-white hover:bg-orange-500 rounded-lg shadow-gray-400 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchComponent;
