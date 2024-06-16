import { Appbar } from "../components/Appbar";
import { BlogsWrapper } from "../components/BlogsWrapper";
import { Loader } from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../hooks";
import { BlogCard } from "../components/BlogCard";

export const Drafts = () => {
    const navigate = useNavigate();
    const { loading, blogs } = useBlogs("drafts");
    if (loading) {
      return (
        <div className="w-full h-svh flex items-center justify-center">
          <Loader color="black" />
        </div>
      );
    }
    if (blogs.length === 0) {
      return (
        <div>
          <Appbar />
          <p className="mx-auto w-max">Sorry, no blogs been drafted yet!</p>
        </div>  
      );
    }
  return (
    <div>
      <Appbar></Appbar>
      <BlogsWrapper>
        {blogs.map((blog, index) => {
          return (
            <BlogCard
              key={index}
              onClick={() => {
                navigate(`/publish/${blog.id}`);
              }}
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
