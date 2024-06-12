import { Blog } from "../hooks"
import { Avatar } from "./BlogCard";

export const FullBlog =({blog}:{blog: Blog})=>{
    return (
      <div className="max-w-4xl flex gap-8 flex-col-reverse md:flex-row mx-auto mt-8 px-4 md:px-0">
        {/* blog */}
        <div className="p-4 max-w-[70ch]">
          <h4 className="text-4xl font-bold">{blog.title}</h4>
          <div className="text-gray-400 text-sm mt-2">
            Posted on August 24, 2024
          </div>
          <p className="mt-4 text-lg text-wrap">
            {blog.content}
          </p>
        </div>
        {/* author */}
        <div className="pl-4 min-w-[25ch]">
          <div className="sticky top-16 flex flex-col gap-4 md:pl-4 md:border-l">
            <span>
              <i>Author</i>
            </span>
            <div className="flex gap-4">
              <Avatar authorName={blog.author.name} />
              <div className="flex flex-col">
                <h4 className="font-medium">{blog.author.name}</h4>
                <p className="text-gray-400 text-sm ">
                  Love to read, reading makes me happy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}