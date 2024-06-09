import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Loader } from "../components/Loader";
import { Appbar } from "../components/Appbar";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    if(loading){
        return <div className="w-full h-svh flex items-center justify-center">
            <Loader color="black"/>
        </div>
    }
  return (
    <div>
      <Appbar/>
      <div className="max-w-xl mx-auto px-4">
        {blogs.map((blog, index) => {
          return (
            <BlogCard
              key={index}
              title={blog.title}
              content={blog.content}
              authorName={blog.author.name}
            />
          );
        })}
      </div>
    </div>
  );    
};
