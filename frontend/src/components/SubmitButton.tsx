import { Loader } from "./Loader";

interface Input {
  label: string;
  loading: boolean;
  onClick: () => void;
}
export const SubmitButton = ({ label, loading, onClick }: Input) => {
  return (
    <button
      className="active:scale-95 transition-transform ease-in delay-200 grow bg-black text-center text-white font-semibold py-2 rounded-md"
      onClick={onClick}
    >
      {loading ? <Loader/> : label }
    </button>   
  );
};
