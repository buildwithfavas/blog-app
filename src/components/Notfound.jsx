import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Notfound = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      {!currentUser ? (
        <Link
          to="/"
          replace
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      ) : (
        <Link
          to="/blog"
          replace
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Blog
        </Link>
      )}
    </div>
  );
};

export default Notfound;
