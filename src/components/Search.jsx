import { IoSearchSharp } from "react-icons/io5";

const Search = ({ handleInput, value }) => {
  return (
    <div className="flex justify-center sm:justify-normal px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative group w-full max-w-xl">
        <input
          value={value}
          onChange={handleInput}
          type="text"
          placeholder="Search Pokémon..."
          className="w-full bg-gray-800/70 border-2 border-gray-700 rounded-full px-6 py-3 pl-12 text-white/90 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all backdrop-blur-sm"
        />
        <IoSearchSharp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-red-400 group-hover:text-red-300 transition-colors" />
      </div>
    </div>
  );
};

export default Search;
