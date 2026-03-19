import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import { TYPE_STYLES, TYPE_ICONS } from "../constants/types";
import {
  FaImage,
  FaTag,
  FaSave,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { FiUpload, FiCheck } from "react-icons/fi";
import useCreateStore from "../store/createStore";

const PokemonCreateForm = ({ onSubmit, onCancel, initialData = null }) => {
  const { isDarkMode } = useThemeStore();
  const { getNextId } = useCreateStore();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    id: initialData?.id || getNextId(),
    types: initialData?.types || [],
    image: initialData?.image || "",
    description: initialData?.description || "",
  });
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const [errors, setErrors] = useState({});

  const availableTypes = Object.keys(TYPE_STYLES).filter(
    (t) => t !== "default",
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.id) {
      newErrors.id = "ID is required";
    } else if (isNaN(formData.id) || formData.id < 1 || formData.id > 10000) {
      newErrors.id = "ID must be a number between 1-10000";
    }

    if (formData.types.length === 0) {
      newErrors.types = "At least one type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: parseInt(formData.id),
        name: formData.name.toLowerCase().replace(/\s+/g, "-"),
        displayName: formData.name,
        isCustom: true,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleType = (type) => {
    if (formData.types.includes(type)) {
      setFormData({
        ...formData,
        types: formData.types.filter((t) => t !== type),
      });
    } else {
      if (formData.types.length < 2) {
        setFormData({
          ...formData,
          types: [...formData.types, type],
        });
      }
    }
  };

  const primaryType = formData.types[0] || "default";
  const typeStyle = TYPE_STYLES[primaryType] || TYPE_STYLES.default;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bottom-6 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 py-4 px-20"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`
            relative rounded-2xl border shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col
            ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 border-gray-700/50"
                : "bg-gradient-to-br from-gray-50/95 via-white/95 to-gray-50/95 border-gray-200/80"
            }
          `}
          style={{
            boxShadow:
              formData.types.length > 0
                ? `0 0 40px ${typeStyle.glow || "rgba(34, 197, 94, 0.3)"}`
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
      

          <motion.button
            onClick={onCancel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              absolute cursor-pointer top-4 right-4 z-10
              ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}
              transition-all p-2 rounded-full
              ${isDarkMode ? "bg-black/30" : "bg-white/30"}
              backdrop-blur-sm
            `}
          >
            <FaTimes className="w-4 h-4" />
          </motion.button>

          <div className="px-8 py-6 border-b border-gray-200/20">
            <div className="flex items-center gap-4">
           
              <div>
                <h2
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {initialData ? "Edit Creation" : "New Creation"}
                </h2>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-rounded-full"
          >
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div
                  className={`
                    w-40 h-40 rounded-2xl overflow-hidden border-2 transition-all
                    ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-900/50 group-hover:border-green-500/50"
                        : "border-gray-200 bg-white group-hover:border-green-400/50"
                    }
                    ${imagePreview ? "" : "flex items-center justify-center"}
                  `}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <FaImage
                      className={`text-5xl ${
                        isDarkMode ? "text-gray-700" : "text-gray-300"
                      }`}
                    />
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      p-3 rounded-xl shadow-lg
                      ${
                        isDarkMode
                          ? "bg-green-900/80 border border-green-700/50 text-green-100 hover:bg-green-900"
                          : "bg-green-100 border border-green-300 text-green-700 hover:bg-green-200"
                      }
                      transition-all
                    `}
                  >
                    <FiUpload className="text-sm" />
                  </motion.div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p
                className={`text-xs mt-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
              >
                Upload sprite
              </p>
            </div>

            <div>
              <label
                className={`
                  block text-sm font-medium mb-2
                  ${isDarkMode ? "text-gray-300" : "text-gray-600"}
                `}
              >
                Pokémon Name 
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Pikachu, Charizard, etc."
                className={`
                  w-full text-sm px-4 py-3 rounded-xl border transition-all
                  ${
                    isDarkMode
                      ? "bg-gray-900/80 border-gray-700 text-white placeholder-gray-600 focus:border-green-500"
                      : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-green-400"
                  }
                  focus:outline-none focus:ring-2 focus:ring-green-500/20
                `}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-xs mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            <div>
              <label
                className={`
                  block text-sm font-medium mb-2
                  ${isDarkMode ? "text-gray-300" : "text-gray-600"}
                `}
              >
                Pokédex ID 
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaTag
                    className={isDarkMode ? "text-gray-600" : "text-gray-400"}
                  />
                </div>
                <input
                  type="number"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  placeholder="Auto-generated"
                  min="1"
                  max="10000"
                  className={`
                    w-full pl-10 pr-4 py-3 rounded-xl border transition-all
                    ${
                      isDarkMode
                        ? "bg-gray-900/80 border-gray-700 text-white placeholder-gray-600 focus:border-green-500"
                        : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-green-400"
                    }
                    focus:outline-none focus:ring-2 focus:ring-green-500/20
                  `}
                />
              </div>
              {!formData.id && (
                <p
                  className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                >
                  Will be auto-generated as #{getNextId()}
                </p>
              )}
              {errors.id && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-xs mt-1"
                >
                  {errors.id}
                </motion.p>
              )}
            </div>

            <div>
              <label
                className={`
                  block text-sm font-medium mb-3
                  ${isDarkMode ? "text-gray-300" : "text-gray-600"}
                `}
              >
                Types {" "}
                <span className="text-xs opacity-60 ml-1">(select up to 2)</span>
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableTypes.map((type) => {
                  const isSelected = formData.types.includes(type);
                  const typeStyle = TYPE_STYLES[type] || TYPE_STYLES.default;
                  const Icon = TYPE_ICONS[type] || TYPE_ICONS.default;
                  const isDisabled = !isSelected && formData.types.length >= 2;

                  return (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => toggleType(type)}
                      whileHover={{ scale: isDisabled ? 1 : 1.02, y: -1 }}
                      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
                      disabled={isDisabled}
                      className={`
                        relative flex items-center gap-2 px-3 py-2.5 rounded-xl
                        transition-all duration-200
                        ${
                          isSelected
                            ? typeStyle.bg + " text-white shadow-lg"
                            : isDarkMode
                              ? "bg-gray-900/80 border border-gray-700 text-gray-400 hover:bg-gray-800"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }
                        ${isDisabled && !isSelected ? "opacity-30 cursor-not-allowed" : ""}
                        ${!isDisabled && !isSelected && "hover:border-green-400/50"}
                      `}
                      style={{
                        boxShadow: isSelected
                          ? `0 0 15px ${typeStyle.glow}`
                          : "none",
                      }}
                    >
                      <span className="text-base">{Icon}</span>
                      <span className="capitalize text-xs font-medium">
                        {type}
                      </span>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1"
                        >
                          <FiCheck className="w-3 h-3 text-white drop-shadow-lg" />
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {formData.types.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2"
                >
                  <span
                    className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Selected:
                  </span>
                  <div className="flex gap-1">
                    {formData.types.map((type) => {
                      const typeStyle =
                        TYPE_STYLES[type] || TYPE_STYLES.default;
                      const Icon = TYPE_ICONS[type] || TYPE_ICONS.default;
                      return (
                        <span
                          key={type}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${typeStyle.bg} text-white`}
                        >
                          <span className="text-xs">{Icon}</span>
                          <span className="capitalize">{type}</span>
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {errors.types && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-xs mt-1"
                >
                  {errors.types}
                </motion.p>
              )}
            </div>

            <div>
              <label
                className={`
                  block text-sm font-medium mb-2
                  ${isDarkMode ? "text-gray-300" : "text-gray-600"}
                `}
              >
                Description{" "}
                <span className="text-xs opacity-60 ml-1">(optional)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="4"
                placeholder="Describe your custom Pokémon's appearance, behavior, or special traits..."
                className={`
                  w-full px-4 text-sm py-3 rounded-xl border transition-all
                  ${
                    isDarkMode
                      ? "bg-gray-900/80 border-gray-700 text-white placeholder-gray-600 focus:border-green-500"
                      : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-green-400"
                  }
                  focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-none
                `}
              />
            </div>
          </form>

          <div className="px-8 py-6 border-t border-gray-200/20 flex gap-3">
            <motion.button
              type="button"
              onClick={onCancel}
              whileTap={{ scale: 0.98 }}
              className={`
                flex-1 cursor-pointer px-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2
                ${
                  isDarkMode
                    ? "bg-gray-900/80 border border-gray-700 text-gray-300 hover:bg-gray-800"
                    : "bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200"
                }
                transition-all
              `}
            >
              <FaArrowLeft className="text-sm" />
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              onClick={handleSubmit}
              whileTap={{ scale: 0.98 }}
              className={`
                flex-1 cursor-pointer px-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2
                ${
                  isDarkMode
                    ? "bg-green-900/80 border border-green-700/50 text-green-100 hover:bg-green-900"
                    : "bg-green-100 border border-green-300 text-green-700 hover:bg-green-200"
                }
                transition-all
              `}
            >
              <FaSave />
              {initialData ? "Update" : "Create"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PokemonCreateForm;
