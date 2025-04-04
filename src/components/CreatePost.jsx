import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router";
import DOMPurify from "dompurify";

const schema = z.object({
  title: z
    .string()
    .min(5, {
      message: `Title must be at least 5 characters`,
    })
    .max(50, { message: `Title must not exceed 50 characters` }),
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
    const clean = DOMPurify.sanitize(editorRef.current.getContent());
    const articleData = {
      title: data.title,
      article: clean,
    };
    if (articleData.article === ``) {
      setError(`root`, { message: `Article cannot be empty` });
    } else {
      const token = localStorage.getItem(`authToken`);
      const Authorization = `Bearer ${token}`;
      const header = {
        headers: { Authorization },
      };
      const url = import.meta.env.VITE_SERVER_URL;

      axios
        .post(`${url}/post`, articleData, header)
        .then((res) => {
          navigate(`/posts`, { replace: true });
        })
        .catch((err) => {
          const mess = err.response.data.message;
          setError(`root`, { message: mess });
        });
    }
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
        <Editor
          apiKey={import.meta.env.VITE_EDITOR_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 400,
            width: 800,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div className="text-red-500 h-4">
          {typeof errors.root === `undefined` ? `` : errors.root.message}
        </div>
        <button className="cursor-pointer py-2 px-3 rounded-lg border-1 border-black dark:border-white">
          Add Post
        </button>
      </form>
    </main>
  );
}

export default CreatePost;
