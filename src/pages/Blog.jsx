import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import BlogList from "../components/BlogList";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  //fetching from firebase
  useEffect(() => {
    async function fetchFireBaseData() {
      try {
        const querySet = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(querySet);
        const blogSet = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(blogSet);
        setBlogs(blogSet);
        console.log(blogs);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchFireBaseData();
  }, []);

  // Deleting function
  async function HandleDelete(id, author) {
    if (currentUser?.email !== author) {
      toast.error("You can delete only your blogs");
      return;
    }
    const confirm = window.confirm(
      "Are you sure you want to delete these blog"
    );
    if (!confirm) {
      return;
    }
    try {
      await deleteDoc(doc(db, "blogs", id));
      window.alert("deleted Successfully");
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4  border-r-4 border-white"></div>
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
            LOADING
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gradient-to-r from-[#0f172a] via-black to-[#1e293b] flex justify-center overflow-y-auto">
      {blogs.length === 0 ? (
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-white text-center  text-6xl font-bold">
            NO BLOGS{" "}
          </h1>
          <p className="text-blue-700 font-extrabold text-sm text-center">
            enjoy adding your first blog,let everyone read it
          </p>
        </div>
      ) : (
        <div className="mt-20 w-3/4 flex flex-col gap-6">
          {blogs.map((blog) => (
            <BlogList
              key={Math.random() * 1000}
              blog={blog}
              HandleDelete={HandleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
