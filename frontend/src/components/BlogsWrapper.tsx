import { ReactNode } from "react";

export const BlogsWrapper = ({children}: {children : ReactNode}) =>{
    return <div className="max-w-xl mx-auto px-4">
        {children}
    </div>;
}