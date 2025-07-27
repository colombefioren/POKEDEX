import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import MoveModal from "../MoveModal";
import MoveCard from "../MoveCard";
import { fetchMoveDetails } from "../../helpers/moveDetails";

const MovesTab = ({ pokemon, typeStyle }) => {
  const [moveModal, setMoveModal] = useState({
    isOpen: false,
    move: null,
    details: null,
    isLoading: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMoves, setFilteredMoves] = useState(pokemon.moves);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMoves(pokemon.moves);
    } else {
      setFilteredMoves(
        pokemon.moves.filter((move) =>
          move.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, pokemon.moves]);

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
    <div className="relative h-[66vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <div className="sticky top-0 z-10 py-4 bg-gray-950/90">
        <div className="relative max-w-md mx-auto ">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-4 w-4 text-gray-400" />
          </div>

          <input
            type="text"
            placeholder="Search moves..."
            className="block w-full pl-9 pr-8 py-2 text-sm  bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-transparent transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="h-4 w-4 text-gray-400 hover:text-white transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/*  grid */}
      <div className="grid px-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 max-h-[70vh] py-1">
        {filteredMoves.length > 0 ? (
          filteredMoves.map((move, index) => (
            <MoveCard
              key={`${move.name}-${index}`}
              move={move}
              onClick={() => handleOpenMoveModal(move)}
              searchQuery={searchQuery}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
            <FiSearch className="h-8 w-8 mb-3" />
            <p className="text-sm">No moves found</p>
          </div>
        )}
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
motion;
export default MovesTab;
