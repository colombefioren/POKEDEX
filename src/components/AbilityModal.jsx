import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const AbilityModal = ({
  abilityDetails,
  isLoading,
  onClose,
  typeStyle,
  isHidden,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="relative bg-gray-900 rounded-xl border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-white capitalize mb-2">
                {abilityDetails?.name.replace("-", " ")}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-gray-800 text-blue-400 text-xs font-bold px-2 py-1 rounded">
                  GEN {abilityDetails?.generation}
                </span>

                {isHidden && (
                  <span className="inline-block bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">
                    HIDDEN ABILITY
                  </span>
                )}
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-1">
                  EFFECT
                </h4>
                <p className="text-white">{abilityDetails?.effect}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-1">
                  IN BATTLE
                </h4>
                <p className="text-white">{abilityDetails?.shortEffect}</p>
              </div>

              <a
                href={`https://pokemondb.net/ability/${abilityDetails?.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 inline-flex items-center px-4 py-2 rounded-lg ${typeStyle.bg} text-white hover:opacity-90 transition-opacity`}
              >
                <FaExternalLinkAlt className="mr-2" />
                View full details on Pokémon DB
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

AbilityModal.propTypes = {
  abilityDetails: PropTypes.shape({
    name: PropTypes.string,
    effect: PropTypes.string,
    shortEffect: PropTypes.string,
    generation: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  typeStyle: PropTypes.object.isRequired,
  isHidden: PropTypes.bool,
};

export default AbilityModal;
