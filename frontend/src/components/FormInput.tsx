interface Input {
  label: string;
  placeholder: string;
  type: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  label,
  placeholder,
  value,
  type,
  onChange,
}: Input) => {
  return (
    <label className="w-full flex flex-col">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="grow px-4 py-2 rounded-md outline-none border border-[#ECECEE]"
      />
    </label>
  );
};
