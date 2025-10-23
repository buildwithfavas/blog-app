import { useEffect, useState, useMemo } from "react";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        //console.log(blogSet);
        setBlogs(blogSet);
        //console.log(blogs);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchFireBaseData();
  }, []);

  const memoizedBlogList = useMemo(() => {
    return blogs.map((blog) => (
      <BlogList
        key={blog.id}
        blog={blog}
        HandleDelete={() => HandleDelete(blog.id)}
      />
    ));
  }, [blogs, HandleDelete]);

  // Deleting function
  function HandleDelete(id) {
    // show confirm toast
    toast(
      ({ closeToast }) => (
        <div>
          <p className="font-medium">
            Are you sure you want to delete this blog?
          </p>
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "blogs", id));
                  toast.success("Deleted Successfully");
                  setBlogs((prev) => prev.filter((blog) => blog.id !== id));
                } catch (error) {
                  toast.error(error.message);
                }
                closeToast(); // closes the confirm toast
              }}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              style={{
                backgroundColor: "#9ca3af",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false, // stays until user clicks
        closeOnClick: false,
        draggable: false,
        position: "top-center",
      }
    );
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
          {memoizedBlogList}
        </div>
      )}
    </div>
  );
};

export default Blog;
