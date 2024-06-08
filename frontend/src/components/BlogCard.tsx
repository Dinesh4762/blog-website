interface BlogCardInputs {
  authorName: string;
  publishedDate?: string;
  title: string;
  content: string;
}
export const BlogCard = ({
  authorName,
  publishedDate = "3 Jan,2024",
  title,
  content,
}: BlogCardInputs) => {
  return (
    <div className="flex flex-col py-4 px-2 border-b border-b-gray-300">
      <div className="flex items-center">
        <Avatar authorName={authorName} />
        <span className="px-2">{authorName}</span>

        {" · "}
        <span className="text-gray-400 text-sm pl-2">{publishedDate}</span>
      </div>
      <div className="text-xl font-bold text-wrap mt-2">{title}</div>
      <div className="text-wrap text-base">{content.slice(0, 100)}...</div>
      <div className="text-gray-400 mt-3">
        {`${Math.ceil(content.split(" ").length / 100)} min read`}</div>
    </div>
  );
};

function Avatar({ authorName }: { authorName: string }) {
  return (
    <div className="w-5 h-5 p-3 rounded-full bg-green-600 grid place-content-center">
      <span className="font-medium text-white">{authorName.split("")[0]}</span>
    </div>
  );
}
