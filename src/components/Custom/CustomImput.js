export default function CustomInput({
  type,
  value,
  onChange,
  name,
  textarea,
  id,
  placeholder,
  big,
  invalid,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
      name={name}
      className={`
        w-full 
        p-4 
        pt-6 
        font-light
        bg-white 
        border-2 
        outline-none  
        text-black 
        ${textarea ? "w-700px h-900px" : "w-full"}
        ${big ? "w-[700px] pb-[1rem]" : ""}
        ${invalid ? "border-red-500" : ""} 
      `}
    />
  );
}