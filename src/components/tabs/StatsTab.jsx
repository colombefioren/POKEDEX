const StatsTab = ({ pokemon, typeStyle }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Base Stats</h3>
      <div className="space-y-3">
        {pokemon.stats.map((stat) => (
          <div key={stat.name} className="flex items-center">
            <div className="w-32 text-gray-400 capitalize text-sm">
              {stat.name.replace("-", " ")}
            </div>
            <div className="w-12 text-white text-right mr-2">
              {stat.base_stat}
            </div>
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${typeStyle.bg} rounded-full`}
                style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Stat Total</h3>
        <div className="text-3xl font-bold text-white">
          {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
        </div>
      </div>
    </div>
  );
};

export default StatsTab;
