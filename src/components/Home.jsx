import { Outlet } from "react-router";
import Header from "./Header";
import { useState } from "react";

function Home() {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div
      className={
        "flex flex-col gap-2 h-screen p-2 text-black dark:text-white bg-white dark:bg-black" +
        (darkTheme ? " dark" : " ")
      }
    >
      <Header theme={darkTheme} setTheme={setDarkTheme} />
      <Outlet />
    </div>
  );
}

export default Home;
