'use client'
import React from "react";

const ActiveClient = () => {
  return (
     <div>
      <div>
        <h1 className="text-center font-semibold mb-3 bg-gray-100 py-[3px]">Active Clients</h1>
        <div>
          <button className="bg-[#52BDB4] px-3 py-1 ml-12 text-white font-semibold mb-3">Refresh</button>
        </div>
        <div className="mt-2 text-center border-2 border-solid border-red-100 bg-[#e6e3e3] font-semibold text-lg py-[3px] font-mono">No Data Found.</div>
      </div>
    </div>
  );
};

export default ActiveClient;
