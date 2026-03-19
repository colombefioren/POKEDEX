import { IoSearch, IoClose } from "react-icons/io5";
import { useThemeStore } from "../store/themeStore";

const Search = ({ handleInput, value }) => {
  const { isDarkMode } = useThemeStore();

  const handleClear = () => {
    const event = {
      target: { value: "" },
    };
    handleInput(event);
  };

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
        className={`block w-full pl-10 pr-12 py-2.5 rounded-full border
          ${
            isDarkMode
              ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-slate-500"
              : "bg-white border-slate-200 text-slate-800 placeholder-slate-500 focus:border-slate-400"
          }
          focus:outline-none focus:ring-1 focus:ring-slate-500/30 font-normal transition-all`}
      />

      {value && (
        <button
          onClick={handleClear}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center transition-transform duration-200"
          type="button"
          aria-label="Clear search"
        >
          <IoClose
            className={`h-6 w-6 transition-all duration-200 ${
              isDarkMode
                ? "text-slate-400 hover:text-slate-200"
                : "text-slate-500 hover:text-slate-700"
            }`}
          />
        </button>
      )}
    </div>
  );
};

export default Search;
