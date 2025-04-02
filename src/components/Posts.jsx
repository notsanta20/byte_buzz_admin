import axios from "axios";
import { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router";

function Posts() {
  const [auth, data] = useOutletContext();

  if (auth) {
    const userId = data.user.id;
    const posts = data.posts.filter((p) => p.authorId === userId);

    function handleDeletePost(id) {
      const token = localStorage.getItem("authToken");
      const Authorization = `Bearer ${token}`;
      const header = {
        headers: { Authorization },
      };
      axios
        .delete(`http://localhost:3000/post/${id}`, header)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }

    return (
      <main>
        <h1>posts</h1>
        <ul className="grid grid-cols-3 gap-3">
          {posts.map((p) => (
            <li
              className="flex flex-col justify-center gap-2 p-5 bg-gray-100 dark:bg-(--gray) rounded-lg"
              key={p.id}
            >
              <div className="flex items-center">
                <div className="flex-1 line-clamp-2">{p.title}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleDeletePost(p.id);
                  }}
                >
                  Delete
                </div>
              </div>
              <div className="line-clamp-4">{p.article}</div>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default Posts;
