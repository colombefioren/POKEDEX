import { IoSearch } from "react-icons/io5";
import { useThemeStore } from "../store/themeStore";
import { motion } from "framer-motion";

const Search = ({ handleInput, value }) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="relative w-[25vw] min-w-[250px]">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <IoSearch
          className={`h-5 w-5 ${
            isDarkMode ? "text-slate-400" : "text-slate-500"
          }`}
        />
      </div>
      <input
        value={value}
        onChange={handleInput}
        type="text"
        placeholder="Search Pokémon..."
        className={`block w-full pl-10 pr-4 py-2.5 rounded-full border
          ${
            isDarkMode
              ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-slate-500"
              : "bg-white border-slate-200 text-slate-800 placeholder-slate-500 focus:border-slate-400"
          }
          focus:outline-none focus:ring-1 focus:ring-slate-500/30 font-normal transition-all`}
      />
    </div>
  );
};
motion;
export default Search;
