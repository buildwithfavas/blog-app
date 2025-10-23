import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { Link } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const BlogList = React.memo(({ blog, HandleDelete }) => {
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState(blog.likes || []);
  const hasLiked = currentUser?.uid && likes.includes(currentUser.uid);

  //toggleLike
  async function ToggleLike() {
    const blogRef = doc(db, "blogs", blog.id);
    try {
      if (hasLiked) {
        await updateDoc(blogRef, {
          likes: arrayRemove(currentUser.uid),
        });
        setLikes(likes.filter((uid) => uid !== currentUser.uid)); // update UI
      } else {
        await updateDoc(blogRef, {
          likes: arrayUnion(currentUser.uid),
        });
        setLikes([...likes, currentUser.uid]); // update UI
      }
    } catch (error) {
      alert("error: " + error);
    }
  }

  return (
    <div
      key={blog.id}
      className="grid grid-cols-2 gap-4 items-center border-b border-b-amber-50  bg-gray-900/90 bg-opacity-70 rounded-xl shadow-lg p-6 hover:scale-[1.01] transition-transform duration-300"
    >
      {/* Image Section */}
      <div className="flex justify-center">
        <img
          src={blog.imageURL}
          alt={blog.title}
          className="w-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Content Section */}
      <div className="text-gray-200 flex flex-col gap-2">
        <h4 className="text-2xl font-bold text-indigo-300">{blog.title}</h4>
        <p className="text-gray-300">{blog.content}</p>
        <div className="flex gap-6 text-sm text-gray-400 mt-2">
          <span>✍️ {blog.author}</span>
          <span>
            📅{" "}
            {blog.createdAt
              ? blog.createdAt.toDate().toLocaleDateString()
              : new Date()}
          </span>
          <button
            onClick={ToggleLike}
            className={`text-[12px] p-2 cursor-pointer rounded-full ${
              hasLiked ? "bg-red-800" : "bg-gray-200"
            }`}
          >
            💚
          </button>
        </div>

        {/* Actions */}
        {currentUser.email === blog.author && (
          <div className="flex gap-4 mt-3">
            <button
              className="p-2  hover:border hover:border-red-400 rounded-lg shadow-md transition-colors"
              onClick={() => HandleDelete(blog.id)}
            >
              <img src={deleteIcon} alt="delete" className="w-6" />
            </button>
            <Link
              to={`/edit/${blog.id}`}
              className="p-2  hover:bg-indigo-300 rounded-lg shadow-md transition-colors"
            >
              <img src={editIcon} alt="editIcon" className="w-6" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});

export default BlogList;
