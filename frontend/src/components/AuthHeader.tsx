import { Link } from "react-router-dom";

export const AuthHeader = ({ type }: { type: string }) => {
  return (
    <div className="text-center mb-10">
      <h3 className="text-2xl font-bold">
        {type === "signup" ? "Create an account" : "Login to your account!"}
      </h3>
      <h5>
        {type === "signup"
          ? " Already have an account?"
          : "Create an account?"}{" "}
        <Link
          className="underline"
          to={type === "signup" ? "/signin" : "/"}
        >
          {type === "signup" ? "Login" : "SignUp"}
        </Link>
      </h5>
    </div>
  );
};
