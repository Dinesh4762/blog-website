export const Quote = () => {
  return (
    <div className="bg-black w-1/2 h-[100svh] hidden md:flex justify-center items-center">
      <div className="flex flex-col gap-3 w-[70%] text-white">
        <p className="text-3xl font-bold">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi velit
          praesentium porro harum consequuntur dolores."
        </p>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Dinesh Kumar</span>
          <span className="text-sm font-base">CEO, Acme Inc</span>
        </div>
      </div>
    </div>
  );
};
