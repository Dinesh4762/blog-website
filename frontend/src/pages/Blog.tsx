import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { Loader } from "../components/Loader";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, blog } = useBlog({ id });
  if (loading) {
    return (
      <div className="w-full h-svh grid place-content-center">
        <Loader color="black" />
      </div>
    );
  }
  if (!blog) {
    return <div>Blog not found</div>;
  }
  function onPublish(){

  }
  return (
    <div>
      <Appbar where="blogs" greenButtonAction={onPublish} />
      <FullBlog blog={blog} />
    </div>
  );
};
