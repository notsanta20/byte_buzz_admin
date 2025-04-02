import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";

const schema = z.object({
  username: z
    .string({ required_error: `username should not be empty` })
    .min(3, {
      message: `username must be at least 3 characters`,
    }),
  password: z
    .string(8, { message: `Password should not be empty` })
    .min(8, { message: `Password must be at least 8 characters` }),
});

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    const token = localStorage.getItem(`authToken`);
    const Authorization = `Bearer ${token}`;
    const header = {
      headers: { Authorization },
    };

    axios
      .post(`http://localhost:3000/login`, data, header)
      .then((res) => {
        localStorage.setItem(`authToken`, res.data.token);
        navigate(`/posts`, { replace: true });
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message === `Username does not exists`) {
          setError("username", { message: `Username does not exists` });
        } else if (message === `invalid Password`) {
          setError("password", { message: `Password is not matching` });
        }
      });
  }

  return (
    <section className="flex-1 flex justify-center items-center bg-gray-100 dark:bg-(--gray) rounded-lg">
      <form
        className="flex flex-col gap-5 min-w-[300px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 ">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="ADMIN"
            className="py-2 px-3 rounded-lg border-1 border-black dark:border-white"
            {...register(`username`)}
          />
          <div className="text-red-500 h-4">
            {typeof errors.username === `undefined`
              ? ``
              : errors.username.message}
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="admin1234"
            className="py-2 px-3 rounded-lg border-1 border-black dark:border-white"
            {...register(`password`)}
          />
          <div className="text-red-500 h-4">
            {typeof errors.password === `undefined`
              ? ``
              : errors.password.message}
          </div>
        </div>
        <button
          className="py-2 px-3 border-1 border-black dark:border-white rounded-lg cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? `Loading` : `Log In`}
        </button>
      </form>
    </section>
  );
}

export default Login;
