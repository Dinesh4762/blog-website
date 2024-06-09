import { Avatar } from "./BlogCard";

export const Appbar = () => {
  const name: string | null = localStorage.getItem("name");
  return (
    <nav className="sticky bg-slate-50 top-0 flex px-10 py-3 border-b">
      <span className="font-bold text-2xl md:ml-28">Medium</span>
      <Avatar authorName={name} custom="cursor-pointer ml-auto w-8 h-8 bg-green-700" />
    </nav>
  );
};
