import React from 'react';
import UI_IMG from "../../assets/images/auth-img.jpg";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <div className="w-full md:w-[68vw] px-4 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children}
      </div>

      <div className="hidden md:flex w-[36vw] items-center justify-center bg-blue-50 bg-[url('/bg-img.jpg')] bg-cover bg-no-repeat bg-center overflow-hidden">
        <img src={UI_IMG} className="w-64 lg:w-[90%] max-w-md" alt="UI Preview" />
      </div>
    </div>
  );
}

export default AuthLayout;
