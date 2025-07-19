import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PokedexShell = ({ children, loading }) => {
  const [animationState, setAnimationState] = useState({
    showContent: false,
    bezelsOpen: false,
  });

  useEffect(() => {
    if (loading) {
      setAnimationState({
        showContent: false,
        bezelsOpen: false,
      });
    } else {
      setAnimationState((prev) => ({ ...prev, bezelsOpen: false }));

      setTimeout(() => {
        setAnimationState((prev) => ({ ...prev, bezelsOpen: true }));
      }, 1500);

      setTimeout(() => {
        setAnimationState((prev) => ({ ...prev, showContent: true }));
      }, 2500);
    }
  }, [loading]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* top  */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-900 to-gray-800 border-b-2 border-gray-700">
          <div className="flex justify-between items-center h-full px-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-white font-mono text-sm tracking-wider">
              POKÉDEX v5.0
            </div>
            <div className="w-8 h-4 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* bottom  */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-gray-800 border-t-2 border-gray-700">
          <div className="flex justify-center items-center h-full px-6 space-x-8">
            <div className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-600"></div>
            <div className="grid grid-cols-3 gap-1">
              <div></div>
              <div className="w-6 h-6 bg-gray-600 rounded-t-full"></div>
              <div></div>
              <div className="w-6 h-6 bg-gray-600 rounded-l-full"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-gray-500"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-r-full"></div>
              <div></div>
              <div className="w-6 h-6 bg-gray-600 rounded-b-full"></div>
              <div></div>
            </div>
            <div className="w-24 h-6 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 pt-16 pb-20 flex flex-col">
        <AnimatePresence>
          {animationState.showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 overflow-hidden px-12"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {/* left */}
        <motion.div
          key="left-bezel"
          initial={{ width: "50%" }}
          animate={{
            width: animationState.bezelsOpen ? "3%" : "50%",
          }}
          exit={{ width: "50%" }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-0 top-16 bottom-16 bg-gradient-to-r from-gray-900 to-gray-800 border-r-2 border-gray-700"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-32 bg-gray-700 rounded-full"></div>
        </motion.div>

        <motion.div
          key="right-bezel"
          initial={{ width: "50%" }}
          animate={{
            width: animationState.bezelsOpen ? "3%" : "50%",
          }}
          exit={{ width: "50%" }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute right-0 top-16 bottom-16 bg-gradient-to-l from-gray-900 to-gray-800 border-l-2 border-gray-700"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-gray-700"></div>
        </motion.div>
      </AnimatePresence>

      {/* pokeball load */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-gray-900"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="relative w-52 h-52"
            >
              <img
                src="/assets/images/pokeballimage.png"
                alt="Loading Pokéball"
                className="object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
motion;

export default PokedexShell;
