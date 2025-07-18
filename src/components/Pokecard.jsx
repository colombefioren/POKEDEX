const Pokecard = ({ id, image, Pokename }) => {
  return (
    <div className="flex cursor-pointer flex-col gap-4 border border-slate-300 rounded-3xl w-52 p-4 text-slate-500 bg-white pokecard">
      <div>ID : {id}</div>
      <div>
        <img
          src={image}
          alt={Pokename}
          className="h-46 object-cover overflow-hidden pokeImg"
        />
      </div>
      <div>{Pokename.toUpperCase()}</div>
    </div>
  );
};

export default Pokecard;
