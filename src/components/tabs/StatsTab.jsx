import { useEffect, useRef } from "react";

const StatsTab = ({ pokemon, typeStyle, isActive }) => {
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

  return (
    <div className="p-6 h-[60vh] flex flex-col justify-between">
      <div className="flex items-center mb-6">
        <div className={`w-3 h-8 ${typeStyle.bg} rounded-full mr-3`}></div>
        <h3 className="text-2xl font-bold text-white tracking-wide">
          Base Stats
        </h3>
        <div className="ml-auto text-xs text-gray-400 px-3 py-1 bg-gray-800 rounded-full">
          Gen {pokemon.generation || "—"}
        </div>
      </div>

      <div className="space-y-4">
        {pokemon.stats.map((stat, index) => (
          <div key={stat.name} className="grid grid-cols-12 items-center gap-2">
            <div className="col-span-3">
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
                {stat.name.replace("-", " ")}
              </span>
            </div>

            <div className="col-span-1 text-right">
              <span className="text-white font-mono font-medium">
                {stat.base_stat}
              </span>
            </div>

            <div className="col-span-8">
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
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

      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="flex items-end">
          <div>
            <h4 className="text-sm font-medium text-gray-400 tracking-wider">
              TOTAL POWER
            </h4>
            <div className="text-4xl font-black text-white">
              {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </div>
          </div>
          <div className="ml-auto relative">
            <div
              className={`w-16 h-16 ${typeStyle.bg} rounded-full flex items-center justify-center`}
            >
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className={`w-8 h-8 ${typeStyle.bg} rounded-full`}></div>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white text-gray-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              Σ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTab;
