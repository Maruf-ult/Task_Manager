import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPassword = type === 'password';

  return (
    <>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none pr-10" 
          value={value}
          onChange={onChange}
        />

        {isPassword && (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEyeSlash size={22} className="text-primary" />
            ) : (
              <FaRegEye size={22} className="text-slate-400" />
            )}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;