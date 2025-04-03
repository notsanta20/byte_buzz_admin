import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Index from "./components";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default App;
