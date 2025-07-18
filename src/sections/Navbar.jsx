import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="bg-red-700 w-full flex justify-between p-4 items-center">
      <div className="ml-4 md:ml-8 xl:ml-32 flex flex-row gap-4 items-center w-fit">
        <img className="h-14" src="../src/assets/images/pokeballimage.png" />
        <img src="../src/assets/images/pokemon writingd.png" className="h-14" />
      </div>
      <div className="text-white menu mr-5 flex md:mr-11 xl:mr-32">
        <div className="space-x-10 hidden sm:block">
          <a href="#">Home</a>
          <a href="#" className="underline">
            Pokedex
          </a>
          <a href="#">Contact Us</a>
          <a href="#">More Info</a>
        </div>
        <IoMenu className="text-4xl sm:hidden" />
      </div>
    </div>
  );
};
export default Navbar;
