import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import MoveModal from "../MoveModal";
import MoveCard from "../MoveCard";
import { fetchMoveDetails } from "../../helpers/moveDetails";
import { useThemeStore } from "../../store/themeStore";

const MovesTab = ({ pokemon, typeStyle }) => {
  const { isDarkMode } = useThemeStore();
  const [moveModal, setMoveModal] = useState({
    isOpen: false,
    move: null,
    details: null,
    isLoading: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMoves, setFilteredMoves] = useState(pokemon.moves);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`relative h-[66vh] overflow-y-auto ${
        isDarkMode
          ? "scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          : "scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
      }`}
    >
      <motion.div
        variants={itemVariants}
        className={`sticky top-0 z-10 py-4 px-6 ${
          isDarkMode ? "bg-gray-950/90" : "bg-white/90"
        } backdrop-blur-sm border-b ${
          isDarkMode ? "border-gray-700/50" : "border-slate-200/80"
        }`}
      >
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch
              className={`h-4 w-4 ${
                isDarkMode ? "text-gray-400" : "text-slate-500"
              }`}
            />
          </div>

          <input
            type="text"
            placeholder="Search moves..."
            className={`block w-full pl-9 pr-8 py-2 text-sm rounded-full ${
              isDarkMode
                ? "bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-white/20"
                : "bg-white border border-slate-200 text-slate-800 placeholder-slate-500 focus:ring-slate-300"
            } focus:outline-none focus:ring-1 focus:border-transparent transition-all`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX
                className={`h-4 w-4 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-700"
                } transition-colors`}
              />
            </button>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid px-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 max-h-[70vh] py-1"
      >
        {filteredMoves.length > 0 ? (
          filteredMoves.map((move, index) => (
            <motion.div
              key={`${move.name}-${index}`}
              variants={itemVariants}
              whileHover={{ y: -3 }}
            >
              <MoveCard
                move={move}
                onClick={() => handleOpenMoveModal(move)}
                searchQuery={searchQuery}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={itemVariants}
            className={`col-span-full flex flex-col items-center justify-center py-12 ${
              isDarkMode ? "text-gray-400" : "text-slate-500"
            }`}
          >
            <FiSearch className="h-8 w-8 mb-3" />
            <p className="text-sm">No moves found</p>
          </motion.div>
        )}
      </motion.div>

      {moveModal.isOpen && (
        <MoveModal
          moveDetails={moveModal.details}
          isLoading={moveModal.isLoading}
          onClose={handleCloseMoveModal}
          typeStyle={typeStyle}
        />
      )}
    </motion.div>
  );
};
motion;
export default MovesTab;
