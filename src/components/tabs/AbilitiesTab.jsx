import { useState } from "react";
import { motion } from "framer-motion";
import { fetchAbilityDetails } from "../../helpers/abilityDetails";
import AbilityModal from "../AbilityModal";
import AbilityCard from "../AbilityCard";

const AbilitiesTab = ({ pokemon, typeStyle }) => {
  const [abilityModal, setAbilityModal] = useState({
    isOpen: false,
    ability: null,
    details: null,
    isLoading: false,
    isHidden: false,
  });

  const handleOpenAbilityModal = async (ability) => {
    setAbilityModal({
      isOpen: true,
      ability: ability.name || "unknown",
      details: null,
      isLoading: true,
      isHidden: ability.is_hidden || false,
    });

    try {
      const details = await fetchAbilityDetails(ability.url);
      setAbilityModal((prev) => ({
        ...prev,
        details,
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
      setAbilityModal((prev) => ({
        ...prev,
        details: {
          name: ability.name || "unknown",
          effect: "Error loading details",
          shortEffect: "Try again later",
          generation: "—",
        },
        isLoading: false,
      }));
    }
  };

  const handleCloseAbilityModal = () => {
    setAbilityModal({
      isOpen: false,
      ability: null,
      details: null,
      isLoading: false,
      isHidden: false,
    });
  };

  return (
    <div
      className={`relative px-4 pb-4 pt-8`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 px-3 md:grid-cols-2 gap-5"
      >
        {pokemon.abilities.map((ability, index) => (
          <AbilityCard
            key={`${ability.name}-${index}`}
            ability={ability}
            typeStyle={typeStyle}
            onClick={() => handleOpenAbilityModal(ability)}
          />
        ))}
      </motion.div>

      {abilityModal.isOpen && (
        <AbilityModal
          abilityDetails={abilityModal.details}
          isLoading={abilityModal.isLoading}
          onClose={handleCloseAbilityModal}
          typeStyle={typeStyle}
          isHidden={abilityModal.isHidden}
        />
      )}
    </div>
  );
};
motion;
export default AbilitiesTab;
