import loader from "../assets/loader.svg"

export const Loader = () =>{
    return (
      <img
        src={loader}
        alt="loading"
        className="mx-auto my-auto invert w-4 h-4"
      />
    );
}