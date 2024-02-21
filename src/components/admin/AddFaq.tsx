import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function AddFaq({ faq, setFaq }: { faq: any; setFaq: any }) {
  const addFaq = () => {
    setFaq([...faq, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    const updatedfaq = [...faq];
    updatedfaq.splice(index, 1);
    setFaq(updatedfaq);
  };

  const handleFieldChange = (
    index: number,
    question: string,
    answer: string
  ) => {
    const updatedfaq = [...faq];
    updatedfaq[index] = { question, answer };
    setFaq(updatedfaq);
  };


  return (
    <div className="w-[100%] flex shadow-xl flex-col gap-6 m-auto mt-5 rounded-[20px] p-4">
      <div className="mt-5">
        <div className="w-[100%] flex px-3 gap-3 justify-between ">
          <p className="text-white text-sm font-bold ">Admin Bank Details</p>
          <button
            onClick={addFaq}
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "1px solid #FFF",
            }}
            className="text-white flex gap-3 text-xs items-center bg-[#003C9D] rounded-[10px] p-2 px-3"
          >
            <span>
              <AiOutlinePlus color="white" />
            </span>{" "}
            Add FNQ
          </button>
        </div>
      </div>
      {faq.map((gateway: any, index: any) => (
        <div
          key={index}
          className="w-[100%] flex-col md:flex-row px-4 gap-3 items-center justify-between "
        >
          <div className="text-xs w-[100%] md:w-[50%] text-white flex flex-col gap-2">
            <label>Question</label>
            <div className="flex justify-center items-center">
              <input
                style={{
                  background:
                    "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
                }}
                placeholder="Question"
                className="w-[100%] text-xs border border-[#fff] outline-none rounded-[20px] p-2"
                value={gateway.question}
                onChange={(e) =>
                  handleFieldChange(index, e.target.value, gateway.answer)
                }
              />
              {index > 0 && (
                <span className="flex cursor-pointer ml-3">
                  <AiOutlineMinus
                    color="white"
                    size="20px"
                    onClick={() => removeFaq(index)}
                  />
                </span>
              )}
            </div>
          </div>

          <div className="text-xs w-[100%] md:w-[100%] text-white flex flex-col gap-2">
            <label>Answer</label>
            <textarea
              style={{
                background:
                  "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
              }}
              placeholder="Answer"
              className="w-[100%] text-xs h-[150px] border border-[#fff] outline-none rounded-[20px] p-2"
              value={gateway.answer}
              onChange={(e) =>
                handleFieldChange(index, gateway.question, e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddFaq;
