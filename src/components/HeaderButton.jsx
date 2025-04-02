import { Link } from "react-router";

function HeaderButton({ auth, setAuth }) {
  if (auth) {
    return (
      <div
        className="cursor-pointer"
        onClick={() => {
          localStorage.setItem("authToken", null);
          setAuth(false);
        }}
      >
        Log Out
      </div>
    );
  } else {
    return (
      <>
        <Link to={`/login`}>Log In</Link>
        <Link to={`/signup`}>Sign Up</Link>
      </>
    );
  }
}

export default HeaderButton;
