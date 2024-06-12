import { useRef } from "react";
import { Appbar } from "../components/Appbar"

export const Publish =()=>{
    const contentRef = useRef<HTMLDivElement | null>(null);

    function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
        console.log(contentRef.current)
      if (e.key === "Enter") {
        e.preventDefault();
        if (contentRef.current) {
          contentRef.current.focus();
        }
      }
    }
    function onPublish(){
        
    }
    return (
      <div>
        <Appbar greenButtonAction={onPublish} />
        <div className="max-w-4xl mx-auto mt-16">
          <div
            contentEditable
            aria-placeholder="Title"
            role="textbox"
            onKeyDown={handleKeyPress}
            className="w-full px-2 py-1 text-5xl font-serif font-medium outline-none focus:border-l-2"
          />
          <div
            contentEditable
            aria-placeholder="Tell your story here..."
            role="textbox"
            ref={contentRef}
            className="w-full px-2 py-1 text-3xl font-serif outline-none mt-4 focus:border-l-2"
          ></div>
        </div>
      </div>
    );
}