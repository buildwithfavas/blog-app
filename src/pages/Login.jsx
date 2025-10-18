import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/blogBG.jpg";
import googleIcon from "../assets/google.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../context/AuthContext.jsx";
import { auth, provider } from "../firebaseConfig";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [haveAccount, setHaveAccount] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signUp } = useAuth();

  function validateInputsEmailAndPassword() {
    if (email === "") {
      toast.warn("Please fill the Email");
      return false;
    } else if (password === "") {
      toast.warn("Please fill the password");
      return false;
    }
    return true;
  }

  //   HandleLogin
  async function HandleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (validateInputsEmailAndPassword()) {
      try {
        await login(email, password);
        navigate("/blog");
      } catch (error) {
        toast.warn("Invalid Username or Password");
        //setError("Failed to Login" + error.message);
      }
    }
    setLoading(false);
  }

  //   Handle google Account
  async function HandleGoogleAccount() {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/blog", { replace: true });
    } catch (error) {
      setError("failed to Login using google account" + error.message);
    }
    setLoading(false);
  }

  //handle SignUp
  async function HandleSignUp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (validateInputsEmailAndPassword()) {
      try {
        await signUp(email, password);
        navigate("/blog");
      } catch (error) {
        setError("failed to SignUp " + error.message);
      }
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4  border-r-4 border-white"></div>
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            LOADING
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen   bg-gradient-to-r from-black via-gray-800 to-black grid grid-cols-2 gap-10 items-center justify-center">
      <div>
        <img
          src={background}
          alt="background"
          className="rounded-full w-10/12"
        />
      </div>
      <div className=" bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold uppercase mb-6 text-center text-white">
          {haveAccount ? "Login" : "SignUp"}
        </h2>
        <form
          className="space-y-2"
          onSubmit={haveAccount ? HandleLogin : HandleSignUp}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full mb-4 px-4 py-2 border-b border-b-white rounded-md focus:outline-none focus:border-b-green-900 text-white placeholder:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 border-b  border-b-white rounded-md focus:outline-none focus:border-b-green-900 text-white placeholder:text-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-900 py-2 cursor-pointer rounded-md hover:bg-purple-700 hover:text-white transition duration-300"
          >
            {haveAccount ? "Sign in" : "Sign Up"}
          </button>
          <div
            className="bg-orange-400 flex items-center justify-center gap-10 p-2 rounded-sm cursor-pointer hover:bg-orange-600"
            onClick={HandleGoogleAccount}
          >
            <p className="text-black font-bold text-[13px] capitalize">
              continue with
            </p>
            <img src={googleIcon} alt="google" className="w-6" />
          </div>
          {haveAccount ? (
            <p
              className="font-bold text-white italic text-sm text-center cursor-pointer hover:text-red-400"
              onClick={() => {
                setHaveAccount(false);
                setEmail("");
                setPassword("");
              }}
            >
              Dont have an account?
            </p>
          ) : (
            <p
              className="font-bold text-white italic text-sm text-center cursor-pointer hover:text-red-400"
              onClick={() => {
                setHaveAccount(true);
                setEmail("");
                setPassword("");
              }}
            >
              already have an account?
            </p>
          )}
          {error && (
            <div className="text-center text-red-700 font-bold text-lg italic">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
