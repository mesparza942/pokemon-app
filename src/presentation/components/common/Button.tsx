import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  btnText?: string;
  icon?: React.ReactNode;
  btnType?: "primary" | "secondary";
};

const Button = ({
  btnText,
  icon,
  children,
  disabled,
  btnType = "primary",
  className = "",
  ...restProps
}: ButtonProps) => {
  const commonClass = disabled
    ? "hover:bg-opacity-80  bg-opacity-80 hover:cursor-not-allowed"
    : "hover:bg-opacity-80";
  const btnTypeClass =
    btnType === "primary" ? "bg-blue-500 text-white" : "bg-white text-black";
  return (
    <button
      className={`${commonClass} ${btnTypeClass} font-semibold focus:outline-none rounded-full py-2 px-4 hover:cursor-pointer ${className}`}
      disabled={disabled}
      {...(restProps as ComponentProps<"button">)}
    >
      {btnText ?? children}
      {icon}
    </button>
  );
};

export default Button;
