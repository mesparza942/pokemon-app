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
  const commonClass = disabled ? "bg-opacity-80 hover:cursor-not-allowed" : "";
  const btnTypeClass = btnType === "primary" ? "bg-[#FEC908]" : "bg-gray-400";
  return (
    <button
      data-testid="button-test"
      className={`${commonClass} ${btnTypeClass} text-black font-semibold focus:outline-none rounded-full py-2 px-4 hover:cursor-pointer ${className}`}
      disabled={disabled}
      {...(restProps as ComponentProps<"button">)}
    >
      {btnText ?? children}
      {icon}
    </button>
  );
};

export default Button;
