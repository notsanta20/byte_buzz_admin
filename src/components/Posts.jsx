import axios from "axios";
import { useOutletContext, Link } from "react-router";

function Posts() {
  const [auth, data, setRefresh] = useOutletContext();

  if (auth) {
    const userId = data.user.id;
    const posts = data.posts.filter((p) => p.authorId === userId);

    function handleDeletePost(id) {
      const num = Math.floor(Math.random);
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
      setRefresh(num);
    }

    return (
      <main>
        <div className="flex p-3">
          <h1 className="flex-1 text-3xl font-bold text-center">ALL POSTS</h1>
          <Link to={`/createPost`}>Create Post</Link>
        </div>
        <ul className="grid grid-cols-3 gap-3">
          {posts.map((p) => (
            <li
              className="flex flex-col justify-around gap-2 p-5 bg-gray-100 dark:bg-(--gray) rounded-lg min-h-[300px]"
              key={p.id}
            >
              <div className="flex items-center">
                <div className="flex-1 line-clamp-2 text-2xl font-semibold">
                  {p.title}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleDeletePost(p.id);
                  }}
                >
                  Delete
                </div>
              </div>
              <div className="line-clamp-4 prose">
                <div dangerouslySetInnerHTML={{ __html: p.article }} />
              </div>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default Posts;
