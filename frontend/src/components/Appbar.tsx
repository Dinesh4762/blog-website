import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { ReactNode } from "react";

export const Appbar = ({
  children,
  saving
}: {
  children?: ReactNode;
  saving?: boolean;
}) => {
  const name: string | null = localStorage.getItem("name");
  return (
    <nav className="sticky top-0 bg-white flex items-center px-10 max-[500px]:px-5 py-3 border-b">
      <Link
        to="/blogs"
        className="cursor-pointer font-mono font-semibold text-2xl md:ml-28"
      >
        Pedium
      </Link>
      {saving !== undefined && (
        <span
          title="in synq with backend"
          className="flex items-center text-[#a39e9e] text-sm gap-1 ml-4"
        >
          {saving ? (
            "...Saving"
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a39e9e"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-cloud-download"
              >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m8 17 4 4 4-4" />
              </svg>
              <span className="text-[#a39e9e]">Saved</span>
            </>
          )}
        </span>
      )}
      <Link
        to="/drafts"
        className="text-gray-500 text-sm font-medium ml-auto mr-6 max-[500px]:mr-3"
      >
        Drafts
      </Link>
      {children}
      <Avatar authorName={name} custom="cursor-pointer w-8 h-8 bg-gray-500" />
    </nav>
  );
};
