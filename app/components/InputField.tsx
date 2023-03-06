interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  required?: boolean;
}


export default function InputField({ label, type, placeholder, name, required } : InputFieldProps) {
  return (
    <div className="w-full p-3">
      <label
        className="block mb-2 text-sm text-gray-500 font-bold"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="appearance-none px-6 py-3.5 w-full text-lg text-gray-500 font-bold bg-gray-100 placeholder-gray-500 outline-none border border-gray-200 focus:ring-4 focus:ring-pink-200 rounded-full"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
