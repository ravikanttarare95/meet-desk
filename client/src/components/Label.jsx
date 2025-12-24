function Label({ htmlFor, labelTitle, customStyle, isMandatory }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${customStyle} block text-base font-medium text-gray-600 mb-1`}
    >
      {labelTitle} <span className="text-red-500">{isMandatory && "*"}</span>
    </label>
  );
}

export default Label;
