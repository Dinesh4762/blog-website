import loader from "../assets/loader.svg"

export const Loader = ({color}: {color?: string}) =>{
    return (
      <img
        src={loader}
        alt="loading"
        className={`mx-auto my-auto ${color ? "w-6 h-6" : "invert w-4 h-4"} `}
      />
    );
}