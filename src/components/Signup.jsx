import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";

const schema = z
  .object({
    username: z
      .string({ required_error: `username should not be empty` })
      .min(3, {
        message: `username must be at least 3 characters`,
      }),
    password: z
      .string(8, { message: `Password should not be empty` })
      .min(8, { message: `Password must be at least 8 characters` }),
    confirmPass: z
      .string(8, { message: `Password should not be empty` })
      .min(8, { message: `Password must be at least 8 characters` }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: `passwords are not matching`,
    path: [`confirmPass`],
  });

function Signup() {
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
    const url = import.meta.env.VITE_SERVER_URL;

    axios
      .post(`${url}/signup`, data, header)
      .then((res) => {
        localStorage.setItem(`authToken`, res.data.token);
        navigate(`/login`, { replace: true });
      })
      .catch((err) => {
        const message = err.response.data.error;
        console.log(message);
        if (message === `Username already exists`) {
          setError("username", { message: `Username already exists` });
        } else {
          setError("confirmPass", {
            message: `Internal server error, try again`,
          });
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
        <div className="flex flex-col gap-2 ">
          <label htmlFor="confirmPass">Password</label>
          <input
            type="password"
            id="confirmPass"
            name="confirmPass"
            placeholder="admin1234"
            className="py-2 px-3 rounded-lg border-1 border-black dark:border-white"
            {...register(`confirmPass`)}
          />
          <div className="text-red-500 h-4">
            {typeof errors.confirmPass === `undefined`
              ? ``
              : errors.confirmPass.message}
          </div>
        </div>
        <button
          className="py-2 px-3 border-1 border-black dark:border-white rounded-lg cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? `Loading` : `Sign Up`}
        </button>
      </form>
    </section>
  );
}

export default Signup;
