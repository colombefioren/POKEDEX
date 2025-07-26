import { useState } from "react";
import { fetchMoveDetails } from "../../helpers/moveDetails";
import MoveCard from "../MoveCard";
import MoveModal from "../MoveModal";
const MovesTab = ({ pokemon, typeStyle }) => {
  const [moveModal, setMoveModal] = useState({
    isOpen: false,
    move: null,
    details: null,
    isLoading: false,
  });
  const handleOpenMoveModal = async (move) => {
    setMoveModal({
      isOpen: true,
      move: move.name || "unknown",
      details: null,
      isLoading: true,
    });

    try {
      const details = await fetchMoveDetails(move.url);
      setMoveModal((prev) => ({
        ...prev,
        details,
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
      setMoveModal((prev) => ({
        ...prev,
        details: {
          name: move.name || "unknown",
          effect: "Error loading details",
          type: move.type || "unknown",
          power: "—",
          accuracy: "—",
          pp: "—",
          damageClass: "—",
          generation: "—",
        },
        isLoading: false,
      }));
    }
  };

  const handleCloseMoveModal = () => {
    setMoveModal({
      isOpen: false,
      move: null,
      details: null,
      isLoading: false,
    });
  };

  return (
    <div className="relative">
      <h3 className="text-2xl font-bold text-white mb-6 text-center bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Pokémon Moves
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-2">
        {pokemon.moves.map((move, index) => (
          <MoveCard
            key={`${move.name}-${index}`}
            move={move}
            typeStyle={typeStyle}
            onClick={() => handleOpenMoveModal(move)}
          />
        ))}
      </div>

      {moveModal.isOpen && (
        <MoveModal
          moveDetails={moveModal.details}
          isLoading={moveModal.isLoading}
          onClose={handleCloseMoveModal}
          typeStyle={typeStyle}
        />
      )}
    </div>
  );
};

export default MovesTab;
