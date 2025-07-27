import { IoSearch } from "react-icons/io5";
import { useThemeStore } from "../store/themeStore";

const Search = ({ handleInput, value }) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="relative w-[25vw]">
      <div
        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
          isDarkMode ? "text-gray-400" : "text-slate-500"
        }`}
      >
        <IoSearch className="h-5 w-5" />
      </div>
      <input
        value={value}
        onChange={handleInput}
        type="text"
        placeholder="SEARCH POKÉMON..."
        className={`block w-full pl-10 pr-4 py-2 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            : "bg-slate-100 border-slate-400 text-slate-800 placeholder-slate-400"
        } border focus:outline-none rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono tracking-wider text-sm transition-all`}
      />
    </div>
  );
};

export default Search;
