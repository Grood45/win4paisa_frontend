
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-400">
    <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
    <p className="text-lg text-white mb-8">Sorry, the page you are looking for does not exist.</p>
    <div className="w-[50%] h-[50%]">
      <img
       className="w-[100%] h-[100%]"
        src="https://i.ibb.co/Lx8vZjk/pngegg.png"
        alt="Custom 404 Image"
        width={600}
        height={300}
      />
    </div>
  </div>
  )
};

export default NotFound;
