import { useEffect, useState } from "react";
import { TYPE_ICONS, TYPE_STYLES } from "../constants/types";
import { Link } from "react-router-dom";

const Pokecard = ({ id = 0, name = "Unknown", image, types = [] }) => {
  const [primaryType, setPrimaryType] = useState("default");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (types.length > 0) {
      const firstType =
        typeof types[0] === "string"
          ? types[0].toLowerCase()
          : types[0]?.type?.name?.toLowerCase() || "default";
      setPrimaryType(firstType);
    }
  }, [types]);

  useEffect(() => {
    if (image === null || image === undefined) {
      setHasError(true);
      setIsLoaded(true);
    }
  }, [image]);

  const typeStyle = TYPE_STYLES[primaryType] || TYPE_STYLES.default;

  return (
    <Link to={`/pokemon/${name.toLowerCase()}`} className="h-full block">
      <div className="relative cursor-pointer h-full bg-gray-900 rounded-xl border-2 border-gray-800 overflow-hidden group hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-[rgba(0,0,0,0.3)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-9 -left-9 w-32 h-32 rounded-full bg-white opacity-4 group-hover:opacity-5 transition-opacity duration-500"></div>
          <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-white opacity-4 group-hover:opacity-5 transition-opacity duration-700"></div>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-br ${typeStyle.glow} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        ></div>

        <div className="px-4 pb-8 pt-5 flex flex-col h-full relative z-10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-gray-400">
              #{id.toString().padStart(3, "0")}
            </span>
          </div>

          <div className="relative mb-2">
            <h3 className="text-center opacity-85 text-xl font-bold text-white mb-1 capitalize tracking-wide transform group-hover:scale-105 transition-transform duration-300">
              {name.toUpperCase()}
            </h3>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-1">
            <div
              className={`absolute inset-2 left-1/2 -translate-x-1/2 w-[55%] bg-gradient-to-b ${typeStyle.glow} opacity-20 blur-3xl group-hover:opacity-30 group-hover:blur-2xl transition-all duration-500`}
            ></div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {!hasError ? (
                <img
                  src={image}
                  alt={name}
                  className={`w-full h-full object-contain transition-all duration-500 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  } group-hover:scale-110`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setHasError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-2 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-xs font-medium">
                    No image to display
                  </span>
                </div>
              )}

              {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-600 border-t-gray-400"></div>
                </div>
              )}
            </div>
          </div>

          {/* type */}
          <div className="flex justify-center gap-3 mt-3">
            {types.map((type, index) => {
              const typeName =
                typeof type === "string"
                  ? type.toLowerCase()
                  : type?.type?.name?.toLowerCase() || "???";
              const buttonStyle = TYPE_STYLES[typeName] || TYPE_STYLES.default;
              const Icon = TYPE_ICONS[typeName] || TYPE_ICONS.default;

              return (
                <span
                  key={`${typeName}-${index}`}
                  className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${buttonStyle.bg} text-white shadow-md hover:shadow-lg duration-200 transform hover:scale-105 transition-all`}
                >
                  {Icon}
                  {typeof type === "string" ? type : type?.type?.name || "???"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Pokecard;
