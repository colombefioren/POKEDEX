const Pokecard = ({ id, image, Pokename }) => {
  const displayName = Pokename ? Pokename.toUpperCase() : "UNKNOWN";
  const displayId = id ?? "N/A";
  const displayImage = image || "https://via.placeholder.com/150"; 

  return (
    <div className="flex cursor-pointer flex-col gap-4 border border-slate-300 rounded-3xl w-52 p-4 text-slate-500 bg-white pokecard">
      <div>ID: {displayId}</div>
      <div>
        <img
          src={displayImage}
          alt={displayName}
          className="h-46 object-cover overflow-hidden pokeImg"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150"; 
          }}
        />
      </div>
      <div>{displayName}</div>
    </div>
  );
};

export default Pokecard;
