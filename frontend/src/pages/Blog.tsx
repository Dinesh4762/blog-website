import { useNavigate, useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { Loader } from "../components/Loader";
import { Appbar } from "../components/Appbar";
import { GreenActionButton } from "../components/GreenActionButton";
import { v4 as uuidv4 } from "uuid";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useState } from "react";
import { CreatePostType } from "@dinesh4762/common-zod-type";

export const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const { loading, blog } = useBlog({ id });
  if (loading) {
    return (
      <div className="w-full h-svh grid place-content-center">
        <Loader color="black" />
      </div>
    );
  }
  if (!blog) {
    return (
      <div className="w-full h-svh grid place-content-center">
        Couldn't fetch your blog :(
      </div>
    );
  }

  function onCreate() {
    setButtonLoading(true);
    const id = uuidv4();
    console.log(id);
    const body: CreatePostType = {
      id: id,
      title: "default title",
      content: "...",
    };
    axios
      .post(`${BACKEND_URL}/api/v1/blog`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        navigate(`/publish/${res.data.id}`);
        setButtonLoading(false);
      })
      .catch((e) => {
        setButtonLoading(false);
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
      <FullBlog blog={blog} />
    </div>
  );
};
