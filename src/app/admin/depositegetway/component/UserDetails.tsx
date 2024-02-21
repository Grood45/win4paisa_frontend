import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface UserDetailsProps {
  formFields: any; // Specify the type of formFields if possible, instead of 'any'
  setFormFields: React.Dispatch<React.SetStateAction<any>>; // Specify the correct type for setFormFields
}
const initialField = {
  name: "",
  type: "",
  required: "",
};

function UserDetails({ formFields, setFormFields }: UserDetailsProps) {
  // Function logic here
  const handleAddField = () => {
    setFormFields([...formFields, initialField]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = formFields.filter((_: any, i: any) => i !== index);
    setFormFields(updatedFields);
  };

  const handleInputChange = (index: number, event: any) => {
    const { name, value } = event.target;
    const updatedFields = [...formFields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };
    setFormFields(updatedFields);
  };


  return (
    <div
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
      className="w-[85%] flex flex-col gap-6 m-auto mt-5  rounded-[20px] pb-3 md:pb-0"
    >
      <div className="mt-5">
        <div className="w-[100%] flex px-3 gap-3 justify-between">
          <p className="text-white text-sm font-bold">User Details</p>
          <button
            onClick={handleAddField}
            className="text-white flex gap-3 text-xs items-center bg-[#003C9D] rounded-[10px] p-2"
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid #FFF",
            }}
          >
            <span>
              <AiOutlinePlus color="white" />
            </span>{" "}
            Add new Gateway
          </button>
        </div>
      </div>
      <div className="mb-4">
        {formFields.map((field: any, index: number) => (
          <div
            key={index}
            className="w-[100%] flex flex-col md:flex-row px-4 mt-2 gap-3 justify-between"
          >
            <div className="text-xs w-[100%] text-white flex flex-col gap-2">
              <label>Field Name</label>
              <input
                name="name"
                style={{
                  background:
                    "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                }}
                value={field.name}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Field Name"
                className="w-[100%] text-xs border border-[#fff] outline-none rounded-[20px] p-2"
              
             />
            </div>
            <div className="text-xs w-[100%] text-white flex flex-col gap-2">
              <label>Input Type</label>
              <select
                name="type"
                style={{
                  background:
                    "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                }}
                value={field.type}

                onChange={(e) => handleInputChange(index, e)}
                placeholder="Input Text"
                className="w-[100%] text-xs  border  border-[#fff] outline-none rounded-[20px] p-2"
              >
             <option className=" text-black m-auto" value={""}>Select Option</option>
             <option className=" text-black"  value={"file"}>File</option>
             <option  className=" text-black"  value={"text"}>Text</option>
             <option className=" text-black"  value={"number"}>Number</option>
              </select>
            </div>
            <div className="text-xs w-[100%] text-white flex flex-col gap-2">
              <label>Input Required</label>
              <select
                style={{
                  background:
                    "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                }}
                name="required"
                value={field.required}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Required"
                className="w-[100%] text-xs border outline-none rounded-[20px] p-2"
              >
                  <option className=" text-black m-auto" value={""}>Select Option</option>
             <option  className=" text-black"  value={"true"}>Required</option>
             <option className=" text-black"  value={"false"}>Not Required</option>
              </select>
            </div>
            {formFields.length > 1 && (
              <span className="cursor-pointer">
                <AiOutlineMinus
                  color="white"
                  onClick={() => handleRemoveField(index)}
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDetails;
