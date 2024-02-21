import { useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";

const SoccerScore = () => {
    const [matchScore, setMatchScore] = useState({});
    const [loading1, setLoading1] = useState(false);
    const toast = useToast();
    const params = useParams();
   
    return (
      <div className=" w-[100%] flex     bg-[#212632] mt-4 rounded-l-[10px] p-[2px] rounded-r-[10px] justify-center    gap-1 ">
        <div className="flex flex-col w-[100%] justify-center gap-1 p-0 lg:p-2 ">
       
              <div className="  flex justify-evenly items-center ">
                <div className="flex flex-col  justify-center items-center ">
                  <p className="font-bold text-xs lg:text-lg text-white ">
                    home name
                  </p>
                  <p className="font-bold text-[10px] lg:text-md text-white ">
                  away name
                  </p>
                </div>
  
                <div className="  rounded-[16px] lg:rounded-[30px]  py-2 px-6 lg:px-12 text-center bg-[#15191E]">
                  <p className="font-semibold text-[10px] lg:text-md  ">Elapsed Time :</p>
                  <p className="font-semibold text-[10px] lg:text-md ">
                    9;30 
                  </p>
                  <p className="font-semibold text-xs lg:text-lg ">
                  6
                  </p>
                </div>
  
                <div className="flex flex-col  justify-center items-center  ">
                  <p className="font-bold text-xs lg:text-lg  text-white ">
                    {" "}
                   score name
                  </p>
                  <p className="font-semibold text-[10px] lg:text-md  text-white ">(HT 0-2)</p>
                </div>
              </div>
        
        </div>
          
      </div>
    );
  };
  export default SoccerScore