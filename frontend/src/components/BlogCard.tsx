import { useNavigate } from "react-router-dom";

interface BlogCardInputs {
  id: string
  authorName: string;
  publishedDate?: string;
  title: string;
  content: string;
}
export const BlogCard = ({
  id,
  authorName,
  publishedDate = "3 Jan,2024",
  title,
  content,
}: BlogCardInputs) => {
  const navigate = useNavigate();
  return (
    <div className=" cursor-pointer flex flex-col py-4 px-2 border-b border-b-gray-300"
    onClick={()=>{
      navigate(`/blog/${id}`)
    }}>
      <div className="flex items-center">
        <Avatar authorName={authorName} />
        <span className="px-2">{authorName}</span>

        {" · "}
        <span className="text-gray-400 text-sm pl-2">{publishedDate}</span>
      </div>
      <div className="text-xl font-bold text-wrap mt-2">{title}</div>
      <div className="text-wrap text-base">{content.slice(0, 100)}...</div>
      <div className="text-gray-400 mt-3">
        {`${Math.ceil(content.split(" ").length / 100)} min read`}
      </div>
    </div>
  );
};

export function Avatar({
  authorName,
  custom = "w-5 h-5 bg-green-600",
}: {
  authorName: string | null;
  custom?: string;
}) {
  return (
    <div
      className={`${custom} p-3 rounded-full  grid place-content-center`}
    >
      <span className="font-medium text-white">{authorName?.split("")[0]}</span>
    </div>
  );
}
