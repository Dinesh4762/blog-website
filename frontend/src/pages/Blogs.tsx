import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Loader } from "../components/Loader";
import { Appbar } from "../components/Appbar";
import { GreenActionButton } from "../components/GreenActionButton";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { CreatePostType } from "@dinesh4762/common-zod-type";
import { BlogsWrapper } from "../components/BlogsWrapper";

export const Blogs = () => {
  const navigate = useNavigate();
  const { loading, blogs } = useBlogs();
  const [buttonLoading, setButtonLoading] = useState<Boolean>(false);
  if (loading) {
    return (
      <div className="w-full h-svh flex items-center justify-center">
        <Loader color="black" />
      </div>
    );
  }
  if (!blogs) {
    return <div>Sorry, No blogs been created yet!</div>;
  }
  function onCreate() {
    setButtonLoading(true);
    const id = uuidv4();
    const body: CreatePostType = {
      id: id,
      title: "default title",
      content: "...",
    };
    console.log(id);
    axios
      .post(`${BACKEND_URL}/api/v1/blog`,body,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        navigate(`/publish/${res.data.id}`);
        setButtonLoading(false);
      })
      .catch((e) => {
        setButtonLoading(false)
        console.error(e);
        alert(e?.response?.data?.error);
      });
  }
  return (
    <div>
      <Appbar>
        <GreenActionButton
          loading={buttonLoading}
          label="Create"
          onClick={onCreate}
        />
      </Appbar>
      <BlogsWrapper>
        {blogs.map((blog, index) => {
          return (
            <BlogCard
              key={index}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              authorName={blog.author.name}
            />
          );
        })}
      </BlogsWrapper>
    </div>
  );
};
