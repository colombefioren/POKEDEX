import { Link } from "react-router-dom";
import evolutionChain from "../../helpers/evolutionChain";
const EvolutionTab = ({ pokemon, typeStyle }) => {
  return (
    <div className="relative flex justify-center items-center h-full">
      {pokemon.species.evolution_chain ? (
        <div className="flex justify-center items-center mb-25">
          <div className="flex items-center justify-center">
            {evolutionChain(pokemon.species.evolution_chain).map(
              (evolution, index, array) => (
                <div key={evolution.name} className="flex items-center">
                  <Link
                    to={`/pokemon/${evolution.name}`}
                    className="group relative flex flex-col items-center transition-all duration-300 hover:scale-105 hover:z-10"
                  >
                    <div
                      className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1 ${typeStyle.glow} bg-opacity-20 group-hover:bg-opacity-40 transition-all`}
                    >
                      <div className="absolute inset-0 rounded-full bg-gray-900/80 backdrop-blur-sm"></div>
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                          alt={evolution.name}
                          className="w-full h-full object-contain drop-shadow-xl"
                          onError={(e) => {
                            e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`;
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/90 px-3 py-1 rounded-full border border-gray-700">
                        <span className="text-white font-medium capitalize text-sm">
                          {evolution.name}
                        </span>
                      </div>
                      <div className="absolute -top-0 -right-0 bg-gray-900 border border-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="text-xs text-gray-300">
                          #{evolution.id.toString().padStart(3, "0")}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {index < array.length - 1 && (
                    <div className="relative mx-2 md:mx-5">
                      <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-block bg-gray-800/50 rounded-full p-6 border border-gray-700/50">
            <svg
              className="w-12 h-12 mx-auto text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-2 text-gray-400">This Pokémon does not evolve</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvolutionTab;
