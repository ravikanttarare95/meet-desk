import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  type = "text",
  id,
  name,
  placeholder,
  onInputChange,
  value,
  customStyle,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = type === "password" && isPasswordVisible ? "text" : type;
  return (
    <div className="relative">
      <input
        tabIndex={0}
        type={inputType}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        className={`${customStyle} w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition`}
        onChange={onInputChange}
      />
      {type === "password" && (
        <div
          className="absolute right-0 top-1/2 -translate-1/2 cursor-pointer w-fit opacity-50 hover:opacity-80 transition-opacity duration-300"
          onClick={() => {
            setIsPasswordVisible(!isPasswordVisible);
          }}
        >
          {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      )}
    </div>
  );
};

export default Input;
