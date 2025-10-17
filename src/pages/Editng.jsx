import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

const Editng = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //fetching those data
  useEffect(() => {
    async function fetchBlog() {
      if (!id) {
        toast.error("No id Exists");
        navigate("/blog");
        return;
      }
      try {
        const blogRef = doc(db, "blogs", id);
        const blogSnap = await getDoc(blogRef);
        if (blogSnap.exists()) {
          const blogData = blogSnap.data();
          setTitle(blogData.title);
          setContent(blogData.content);
        } else {
          toast.error("no such data exists");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchBlog();
  }, [id, navigate]);

  //handleUpdate feature
  async function HandleEdit(e) {
    e.preventDefault();
    try {
      const blogList = doc(db, "blogs", id);
      await updateDoc(blogList, {
        title,
        content,
      });
      //console.log("data added");
      toast.success("Data updated successfully");
      navigate("/blog", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-2xl shadow-2xl shadow-black/50">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-400 text-center">
          Edit Blog
        </h2>
        <form onSubmit={HandleEdit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-400/30 outline-none transition-all duration-300"
            required
          />
          <textarea
            placeholder="Enter blog content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-400/30 outline-none transition-all duration-300"
            rows={8}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editng;
