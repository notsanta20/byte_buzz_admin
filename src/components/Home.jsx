import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const [refresh, setRefresh] = useState(``);
  const url = useLocation().pathname;
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/`, header)
      .then((res) => {
        setData(res.data);
        setAuth(res.data.auth);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, auth, refresh]);

  return (
    <div
      className={
        "flex flex-col gap-2 h-screen p-2 text-black dark:text-white bg-white dark:bg-(--gray-bg)" +
        (darkTheme ? " dark" : " ")
      }
    >
      <Header
        theme={darkTheme}
        setTheme={setDarkTheme}
        auth={auth}
        setAuth={setAuth}
      />
      <Outlet context={[auth, data, setRefresh]} />
    </div>
  );
}

export default Home;
