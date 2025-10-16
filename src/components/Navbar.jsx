import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function HandleLogOut() {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <header className="w-full min-h-10 flex items-center justify-between text-white  bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0f172a] shadow-md  p-4 fixed top-0 z-[1000]">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                   bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Blog
        </Link>
        <ul className="inline-flex gap-6">
          {currentUser && (
            <Link to={"/liked"}>
              <button className="bg-gradient-to-r from-indigo-700 via-purple-900 to-indigo-900 rounded-full px-5 py-2 font-semibold text-sm cursor-pointer hover:border border-amber-100">
                favourites 🩷
              </button>
            </Link>
          )}
          {!currentUser ? (
            <li
              className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900
               text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all 
               duration-300 backdrop-blur-md bg-opacity-80"
            >
              <Link to={"/login"}>login</Link>
            </li>
          ) : (
            <li
              className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900
               text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all 
               duration-300 backdrop-blur-md bg-opacity-80"
            >
              <Link onClick={HandleLogOut}>logOut</Link>
            </li>
          )}
          {currentUser && (
            <Link to={"/add"}>
              <button className="bg-gradient-to-r from-indigo-700 via-purple-900 to-indigo-900 rounded-full px-5 py-2 font-semibold text-sm cursor-pointer hover:border border-amber-100">
                Add Blog➕
              </button>
            </Link>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
