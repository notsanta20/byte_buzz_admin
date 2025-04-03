import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";

const schema = z.object({
  title: z.string({ required_error: `title should not be empty` }).min(5, {
    message: `title must be at least 5 characters`,
  }),
  article: z
    .string({ required_error: `article cannot be empty` })
    .min(20, { message: `Article need to be at least 20 characters` }),
});

function CreatePost() {
  const navigate = useNavigate();
  const editorRef = useRef();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function handleOnSubmit(data) {
    const token = localStorage.getItem(`authToken`);
    const Authorization = `Bearer ${token}`;
    const header = {
      headers: { Authorization },
    };

    axios
      .post(`http://localhost:3000/post`, data, header)
      .then((res) => {
        navigate(`/posts`, { replace: true });
      })
      .catch((err) => {
        const mess = err.response.data.message;
        setError(`article`, { message: mess });
      });
  }

  return (
    <main className="p-2 flex flex-col gap-5 items-center">
      <h1 className="text-3xl font-bold">Create Post</h1>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="py-2 px-3 rounded-lg border-1 border-black dark:border-white"
            {...register(`title`)}
          />
          <div className="text-red-500 h-4">
            {typeof errors.title === `undefined` ? `` : errors.title.message}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <textarea
            name="article"
            id="article"
            rows={10}
            cols={50}
            className="py-2 px-3 rounded-lg border-1 border-black dark:border-white"
            {...register(`article`)}
          ></textarea>
          <div className="text-red-500 h-4">
            {typeof errors.article === `undefined`
              ? ``
              : errors.article.message}
          </div>
        </div>
        <button className="cursor-pointer py-2 px-3 rounded-lg border-1 border-black dark:border-white">
          Add Post
        </button>
      </form>
    </main>
  );
}

export default CreatePost;
