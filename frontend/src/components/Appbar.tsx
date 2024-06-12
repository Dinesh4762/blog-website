import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { GreenActionButton } from "./GreenActionButton";

export const Appbar = ({
  where,
  greenButtonAction,
}: {
  where?: string;
  greenButtonAction: ()=> void;
}) => {
  const name: string | null = localStorage.getItem("name");
  return (
    <nav className="sticky top-0 flex items-center px-10 py-3 border-b">
      <Link to="/blogs" className="cursor-pointer font-bold text-2xl md:ml-28">
        Medium
      </Link>
      <GreenActionButton
        label={where ? "Create" : "Publish"}
        onClick={greenButtonAction}
      />
      <Avatar authorName={name} custom="cursor-pointer w-8 h-8 bg-gray-500" />
    </nav>
  );
};
