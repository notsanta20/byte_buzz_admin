import { Link } from "react-router";

function Index() {
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

export default Index;
