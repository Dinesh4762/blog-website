import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    name: string;
  };
}
export const useBlog = ({ id }: { id: string | undefined }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setblog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setblog(res.data.blog);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.error(e); 
      });
  }, [id]);

  return { loading, blog };
};
export const useBlogs = (path : string) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setblogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${path}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setblogs(res.data.blogs);
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
        alert(e?.response?.data?.error);
      });
  }, [path]);

      return { loading, blogs}
}