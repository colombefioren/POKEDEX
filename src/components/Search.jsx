import { IoSearchSharp } from "react-icons/io5";
const Search = ({ handleInput, value }) => {
  return (
    <div className="flex justify-center sm:justify-normal">
      <div className="bg-red-700 p-4 xl:ml-32 ml-10 flex mt-4 items-center gap-3 w-fit rounded-full ">
        <div>
          <input
            value={value}
            onChange={handleInput}
            type="text"
            className="rounded-full px-4 outline-none bg-white py-2 ml-3"
          />
        </div>
        <div>
          <IoSearchSharp className="text-3xl text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default Search;
