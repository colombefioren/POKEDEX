import { useEffect, useRef } from "react";
import { useThemeStore } from "../../store/themeStore";

const StatsTab = ({ pokemon, typeStyle, isActive }) => {
  const { isDarkMode } = useThemeStore();
  const barRefs = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isActive && !hasAnimated.current) {
      barRefs.current.forEach((bar) => {
        if (bar) {
          bar.style.width = "0%";
        }
      });

      setTimeout(() => {
        barRefs.current.forEach((bar) => {
          if (bar) {
            const width = bar.getAttribute("data-width");
            bar.style.width = width;
          }
        });
        hasAnimated.current = true;
      }, 50);
    }

    if (!isActive) {
      hasAnimated.current = false;
    }
  }, [isActive]);

  const textClass = isDarkMode ? "text-white" : "text-slate-600";
  const secondaryTextClass = isDarkMode ? "text-gray-300" : "text-slate-600";
  const bgClass = isDarkMode ? "bg-gray-800" : "bg-slate-200";

  return (
    <div className="py-6 px-10 h-[60vh] flex flex-col justify-between">
      <div className="flex items-center mb-6">
        <div className={`w-3 h-8 ${typeStyle.bg} rounded-full mr-3`}></div>
        <h3 className={`text-2xl font-bold tracking-wide ${textClass}`}>
          Base Stats
        </h3>
        <div
          className={`ml-auto text-xs px-3 py-1 rounded-full ${
            isDarkMode
              ? "bg-gray-800 text-gray-400"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          Gen {pokemon.generation || "—"}
        </div>
      </div>

      <div className="space-y-4">
        {pokemon.stats.map((stat, index) => (
          <div key={stat.name} className="grid grid-cols-12 items-center gap-2">
            <div className="col-span-3">
              <span
                className={`text-xs font-medium uppercase tracking-wider ${secondaryTextClass}`}
              >
                {stat.name.replace("-", " ")}
              </span>
            </div>

            <div className="col-span-1 text-right">
              <span className={`font-mono font-medium ${textClass}`}>
                {stat.base_stat}
              </span>
            </div>

            <div className="col-span-8">
              <div
                className={`relative h-3 rounded-full overflow-hidden ${bgClass}`}
              >
                <div
                  ref={(el) => (barRefs.current[index] = el)}
                  className={`absolute top-0 left-0 h-full ${typeStyle.bg} rounded-full transition-all duration-1000 ease-out`}
                  style={{
                    width: isActive
                      ? "0%"
                      : `${Math.min(stat.base_stat, 100)}%`,
                    boxShadow: `0 0 4px ${typeStyle.bg.replace(
                      "bg-",
                      "text-"
                    )}`,
                  }}
                  data-width={`${Math.min(stat.base_stat, 100)}%`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-8 pt-6 border-t ${
          isDarkMode ? "border-gray-700" : "border-slate-200"
        }`}
      >
        <div className="flex items-end">
          <div>
            <h4
              className={`text-sm font-medium tracking-wider ${secondaryTextClass}`}
            >
              TOTAL POWER
            </h4>
            <div className={`text-4xl font-black ${textClass}`}>
              {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </div>
          </div>
          <div className="ml-auto relative">
            <div
              className={`w-16 h-16 ${typeStyle.bg} rounded-full flex items-center justify-center`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-white/20" : "bg-white/80"
                }`}
              >
                <div className={`w-8 h-8 ${typeStyle.bg} rounded-full`}></div>
              </div>
            </div>
            <div
              className={`absolute -bottom-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center ${
                isDarkMode
                  ? "bg-white text-gray-900"
                  : "bg-slate-800 text-white"
              } text-xs font-bold`}
            >
              Σ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTab;
