import { Link, useOutletContext, useNavigate } from "react-router";

function Index() {
  const [auth, data] = useOutletContext();
  const navigate = useNavigate();

  if (auth) {
    navigate(`/posts`, { replace: true });
    return <h1>You are logged in, go to Posts</h1>;
  } else {
    return (
      <main className="flex-1 flex flex-col rounded-lg justify-center items-center gap-2 text-black dark:text-white bg-gray-100 dark:bg-(--gray)">
        <h1 className="text-4xl font-semibold">
          Welcome to Byte Buzz Admin page
        </h1>
        <h2 className="text-2xl">
          <Link to={`/login`} className="italic underline text-xl">
            Log In
          </Link>{" "}
          to post articles
        </h2>
      </main>
    );
  }
}

export default Index;
