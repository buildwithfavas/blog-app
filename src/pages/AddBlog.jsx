import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { replace, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // function to add
  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      if (onPostValidation()) {
        await addDoc(collection(db, "blogs"), {
          title,
          content,
          imageURL,
          author: currentUser.email,
          createdAt: serverTimestamp(),
          likes: [],
        });
        toast.success("new Blog inserted");
        navigate("/blog", { replace: true });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  function onPostValidation() {
    if (title === "" || content == "" || imageURL === "") {
      toast.warn("Fill the valid fields");
      return false;
    }
    return true;
  }

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="max-w-2xl  mt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-2xl shadow-2xl shadow-black/50">
        <button
          onClick={() => history.back()}
          className="border border-white rounded-sm text-white p-1 cursor-pointer hover:bg-blue-300"
        >
          back
        </button>
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-400 text-center">
          Create Blog
        </h2>
        <form onSubmit={HandleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-400/30 outline-none transition-all duration-300"
          />
          <textarea
            placeholder="Blog content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-400/30 outline-none transition-all duration-300"
            rows={6}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-400/30 outline-none transition-all duration-300"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
