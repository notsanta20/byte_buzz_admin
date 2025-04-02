import { Link } from "react-router";
import HeaderButton from "./HeaderButton";

function Header({ theme, setTheme, auth, setAuth }) {
  function handleThemeChange() {
    if (theme) {
      setTheme(false);
    } else {
      setTheme(true);
    }
  }

  return (
    <header className="flex items-center py-2 px-3 rounded-lg bg-gray-200 dark:bg-(--gray) text-black dark:text-white">
      <h1 className="flex-1">Byte Buzz Admin</h1>
      <div className="flex gap-5">
        <img
          src={theme ? `/assets/half-moon.svg` : `/assets/sun-light.svg`}
          alt="theme icon"
          className="w-[18px] cursor-pointer"
          onClick={handleThemeChange}
        />
        <HeaderButton auth={auth} setAuth={setAuth} />
      </div>
    </header>
  );
}

export default Header;
