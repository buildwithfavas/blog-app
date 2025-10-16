import landing from "../assets/landing.jpeg";

const Landing = () => {
  return (
    <div className="min-h-screen grid grid-cols-2 gap-5 items-center justify-center  w-full bg-gradient-to-r from-indigo-900 via-black to-gray-900">
      <div className="flex flex-col items-center justify-center   text-white p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to Blog
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 text-center max-w-2xl">
          Discover insightful articles, tips, and stories from our community of
          writers.
        </p>

        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg max-w-xl text-center">
          <h2 className="text-2xl font-bold text-indigo-300 mb-3">
            Please Login to Continue
          </h2>
          <p className="text-gray-200 mb-4">
            To read our blogs, please{" "}
            <span className="font-semibold text-white">log in</span> first. Only
            registered users can explore and enjoy our content.
          </p>
          <ul className="text-gray-300 mb-4 list-disc list-inside space-y-1">
            <li>Stay updated with the latest posts.</li>
            {/* <li>Save and manage your favorite articles.</li> */}
            <li>
              Interact with a community of passionate readers and writers.
            </li>
          </ul>
          <p className="text-indigo-400 font-semibold">Please Login</p>
        </div>
      </div>

      <div>
        <img
          src={landing}
          alt="Landing visual"
          className="w-4/5 mt-6 rounded-e-full shadow-md"
        />
      </div>
    </div>
  );
};

export default Landing;
