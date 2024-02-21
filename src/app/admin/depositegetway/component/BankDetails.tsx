import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function BankDetails({gateways, setGateways}:{gateways:any, setGateways:any}) {

  const addGateway = () => {
    setGateways([...gateways, { fieldName: "", fieldValue: "" }]);
  };

  const removeGateway = (index: number) => {
    const updatedGateways = [...gateways];
    updatedGateways.splice(index, 1);
    setGateways(updatedGateways);
  };

  const handleFieldChange = (
    index: number,
    fieldName: string,
    fieldValue: string
  ) => {
    const updatedGateways = [...gateways];
    updatedGateways[index] = { fieldName, fieldValue };
    setGateways(updatedGateways);
  };


  return (
    <div
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
      className="w-[85%] flex flex-col gap-6 m-auto mt-5 rounded-[20px] p-4"
    >
      <div className="mt-5">
        <div className="w-[100%] flex px-3 gap-3 justify-between ">
          <p className="text-white text-sm font-bold ">Admin Bank Details</p>
          <button
            onClick={addGateway}
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid #FFF",
            }}
            className="text-white flex gap-3 text-xs items-center bg-[#003C9D] rounded-[10px] p-2 px-3"
          >
            <span>
              <AiOutlinePlus color="white" />
            </span>{" "}
            Add new Gateway
          </button>
        </div>
      </div>
      {gateways.map((gateway:any, index:any) => (
        <div
          key={index}
          className="w-[100%] flex flex-col md:flex-row px-4 gap-3 items-center justify-between "
        >
          <div className="text-xs w-[100%] md:w-[50%] text-white flex flex-col gap-2">
            <label>Field Name</label>
            <input
              style={{
                background:
                  "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
              }}
              placeholder="Field Name"
              className="w-[100%] text-xs border border-[#fff] outline-none rounded-[20px] p-2"
              value={gateway.fieldName}
              onChange={(e) =>
                handleFieldChange(index, e.target.value, gateway.fieldValue)
              }
            />
          </div>
          <div className="text-xs w-[100%] md:w-[50%] text-white flex flex-col gap-2">
            <label>Field Value</label>
            <input
              style={{
                background:
                  "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
              }}
              placeholder="Field Value"
              className="w-[100%] text-xs border border-[#fff] outline-none rounded-[20px] p-2"
              value={gateway.fieldValue}
              onChange={(e) =>
                handleFieldChange(index, gateway.fieldName, e.target.value)
              }
            />
          </div>
          {index > 0 && (
            <span className="flex items-center rounded-[10px] p-2 px-3 cursor-pointer">
              <AiOutlineMinus
                color="white"
                onClick={() => removeGateway(index)}
              />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default BankDetails;
