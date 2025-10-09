import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import BlogList from "../components/BlogList";

export default function LikedBlogs() {
  const { currentUser } = useAuth();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blogs"), (snap) => {
      setBlogs(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const liked = blogs.filter((b) => b.likes?.includes(currentUser?.uid));

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-900 via-black to-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">❤️ Your Liked Blogs</h2>

        {liked.length > 0 ? (
          <div className="space-y-6 overflow-y-auto max-h-[80vh] px-2">
            {liked.map((b) => (
              <BlogList
                key={b.id}
                blog={b}
                HandleDelete={() => {}}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300 mt-4">No liked blogs yet.</p>
        )}
      </div>
    </div>
  );
}
