import { IoSearch } from "react-icons/io5";

const Search = ({ handleInput, value }) => {
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <IoSearch className="h-5 w-5" />
      </div>
      <input
        value={value}
        onChange={handleInput}
        type="text"
        placeholder="SEARCH POKÉMON..."
        className="block w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono tracking-wider text-sm transition-all"
      />
    </div>
  );
};

export default Search;