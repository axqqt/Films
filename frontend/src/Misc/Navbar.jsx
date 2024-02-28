import { useContext } from "react";
import { Link } from "react-router-dom";
import {UserData} from "../App"


const Navbar = () => {
  const {logged} = useContext(UserData)
  return logged?(
    <ul className="flex space-x-4 bg-gray-800 p-4">
      <li>
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        </li>
      <li>
        <Link to="/generate" className="text-white hover:text-gray-300">
          Generate Images
        </Link>
      </li>
      <li>
        <Link to="/diffusion" className="text-white hover:text-gray-300">
          Stable Diffusion
        </Link>
      </li>
      <li>
        <Link to="/yts" className="text-white hover:text-gray-300">
          View YTS Films!
        </Link>
      </li>
      <li>
        <Link to="/profile" className="text-white hover:text-gray-300">
          Your account
        </Link>
      </li>
      <li>
        <Link to="/favs" className="text-white hover:text-gray-300">
          My Favorites
        </Link>
      </li>
      <li>
        <Link to="/addfilm" className="text-white hover:text-gray-300">
          Add Film
        </Link>
      </li>
    </ul>
  ) :    <ul className="flex space-x-4 bg-gray-800 p-4">
  <li>
    <Link to="/newuser" className="text-white hover:text-gray-300">
      Register
    </Link>
  </li>
  <li>
    <Link to="/login" className="text-white hover:text-gray-300">
      Login
    </Link>
  </li>
</ul> ;
};

export default Navbar;
