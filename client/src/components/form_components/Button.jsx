import React from "react";

function Button({
  type,
  btnTitle,
  onBtnClick,
  btnVariant,
  customStyle = "",
  isDisabled,
  size = "md",
}) {
  const variantClass =
    btnVariant === "primary"
      ? "border border-transparent bg-violet-600 hover:bg-violet-700 text-white"
      : btnVariant === "secondary"
      ? "border border-rose-300 hover:border-rose-400 text-rose-500"
      : "bg-slate-200 text-slate-900 hover:bg-slate-300";

  const sizeClass =
    size === "lg"
      ? "text-lg sm:text-xl px-8 py-3 rounded-lg shadow-lg font-bold "
      : size === "sm"
      ? "text-sm sm:text-base px-4 py-1.5 rounded-md shadow-sm font-light"
      : "text-base sm:text-lg px-5 py-2.5 rounded-lg shadow-md font-medium";

  return (
    <button
      type={type}
      className={`${customStyle} ${sizeClass} ${variantClass} cursor-pointer transition-all duration-300`}
      onClick={onBtnClick}
      disabled={isDisabled}
    >
      {btnTitle}
    </button>
  );
}

export default Button;
