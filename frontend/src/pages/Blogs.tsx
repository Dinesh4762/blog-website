import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Loader } from "../components/Loader";
import { Appbar } from "../components/Appbar";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    console.log(blogs)
    if(loading){
        return <div className="w-full h-svh flex items-center justify-center">
            <Loader color="black"/>
        </div>
    }
    if(!blogs){
      return <div>
        Sorry, No blogs been created yet!
      </div>
    }
    function onCreate(){
      
    }
  return (
    <div>
      <Appbar where="blogs" greenButtonAction={onCreate}/>
      <div className="max-w-xl mx-auto px-4">
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
      </div>
    </div>
  );    
};
