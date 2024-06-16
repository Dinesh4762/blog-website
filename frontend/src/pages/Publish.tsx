import { useRef, useState } from "react";
import { Appbar } from "../components/Appbar";
import { GreenActionButton } from "../components/GreenActionButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import { useBlog } from "../hooks";
import { Loader } from "../components/Loader";

export const Publish = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const { loading, blog } = useBlog({ id });
  const [saving, setSaving] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return (
      <div className="w-full h-svh bg-white grid place-content-center">
        <Loader color="black"></Loader>
      </div>
    );
  }
  if (!blog) {
    return <div className="mx-auto">something went wrong...</div>;
  }
  function onPublish() {
    setButtonLoading(true);
    axios
      .put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id: id,
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setButtonLoading(false);
        alert(res.data);
        navigate(`/blog/${id}`);
      })
      .catch((e) => {
        setButtonLoading(false);
        console.error(e);
        alert(e?.response?.data?.error);
      });
  }
  var timeout: NodeJS.Timeout;
  function handleInput(field: 'title' | 'content', value: string) {
    clearTimeout(timeout);
    if (!titleRef.current || !contentRef.current) {
      return;
    }
    timeout = setTimeout(() => {
      setSaving(true);
      axios
        .put(
          `${BACKEND_URL}/api/v1/blog`,
          { id,[field]: value},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .finally(() => setSaving(false));
    }, 2 * 1000);
  }
  return (
    <div className="relative">
      <Appbar saving={saving}>
        <GreenActionButton
          loading={buttonLoading}
          label="Publish"
          onClick={onPublish}
        />
      </Appbar>
      <div className="max-w-4xl mx-auto mt-16">
        <div
          contentEditable
          aria-placeholder="Title"
          role="textbox"
          ref={titleRef}
          onInput={(e: React.FormEvent<HTMLDivElement>) => {
            handleInput("title", e.currentTarget.innerText);
          }}
          dangerouslySetInnerHTML={{ __html: blog.title }}
          className="w-full px-2 py-1 text-5xl font-serif font-medium outline-none focus:border-l-2"
        ></div>
        <div
          contentEditable
          aria-placeholder="Tell your story here..."
          role="textbox"
          ref={contentRef}
          onInput={(e: React.FormEvent<HTMLDivElement>) => {
            handleInput("content", e.currentTarget.innerText);
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="w-full px-2 py-1 text-3xl font-serif outline-none mt-4 focus:border-l-2"
        ></div>
      </div>
    </div>
  );
};
