import { useEffect, useState } from "react";
import { TYPE_TRANSLATION, TYPE_ICONS, TYPE_STYLES } from "../constants/types";
import { Link } from "react-router-dom";

const Pokecard = ({ id, name, image, apiTypes = [] }) => {
  const [primaryType, setPrimaryType] = useState("default");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (apiTypes.length > 0) {
      const firstType = apiTypes[0]?.name?.toLowerCase();
      const translatedType = TYPE_TRANSLATION[firstType] || "default";
      setPrimaryType(translatedType);
    }
  }, [apiTypes]);

  const typeStyle = TYPE_STYLES[primaryType] || TYPE_STYLES.default;

  return (
    <Link
      to={`/pokemon/${name.toLowerCase()}`}
    >
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
              #{id?.toString().padStart(3, "0") || "???"}
            </span>
          </div>
          <div className="relative mb-2">
            <h3
              className={`text-center opacity-85 text-xl font-bold text-white mb-1 capitalize tracking-wide 
                         transform group-hover:scale-105 transition-transform duration-300`}
            >
              {name.toUpperCase() || "Unknown"}
            </h3>
          </div>
          <div className="relative flex-1 flex items-center justify-center my-1">
            <div
              className={`absolute inset-2 left-1/2 -translate-x-1/2 w-[55%] bg-gradient-to-b ${typeStyle.glow} opacity-20 blur-3xl 
                       group-hover:opacity-30 group-hover:blur-2xl transition-all duration-500`}
            ></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src={image}
                alt={name}
                className={`w-full h-full object-contain transition-all duration-500 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                } group-hover:scale-110`}
                onLoad={() => setIsLoaded(true)}
              />
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-gray-600 border-t-gray-400"></div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-3">
            {apiTypes.map((type) => {
              const typeName = type?.name?.toLowerCase();
              const translatedType = TYPE_TRANSLATION[typeName] || "default";
              const buttonStyle =
                TYPE_STYLES[translatedType] || TYPE_STYLES.default;
              const Icon = TYPE_ICONS[translatedType] || TYPE_ICONS.default;

              return (
                <span
                  key={typeName}
                  className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${buttonStyle.bg} text-white 
                            shadow-md hover:shadow-lg duration-200
                            transform hover:scale-105 transition-all`}
                >
                  {Icon}
                  {type?.name || "???"}
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
