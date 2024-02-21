import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



const TennisScore = () => {
  const [matchScore, setMatchScore] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const params = useParams();
  // useEffect(() => {
  //   const socket = socketIOClient("https://power-db-database.onrender.com");

  //   socket.on("connect", () => {
  //     setLoading1(true);
  //   });

  //   socket.on("scoreData", (data) => {
  //     setMatchScore(data);
  //     setLoading1(false);
  //   });

  //   socket.on("disconnect", () => {
  //     setLoading1(false);
  //   });

  //   // Emit the "startFetching" event with the eventID
  //   socket.emit("startFetchingScore", params.id);

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [params.id]);

  return (
    <div className=" w-[100%] mt-4  bg-[#212632] rounded-[10px]  lg:w-[100%] flex flex-col mr-2 gap-1 ">
      <div className="bg-[#4A4A4A] flex justify-between items-center px-2"></div>
      <div className="flex flex-col gap-1 p-2">
     
            <div className = " bg-[#212632] rounded-l-[10px] p-0 lg:p-6 rounded-r-[10px] flex justify-between  ">
              <div className="text-white flex justify-between  text-left  w-[100%]">
                <div className="w-[35%] flex justify-between text-sm font-semibold ">
                  <div className=" flex flex-col gap-1 text-[10px] lg:text-sm font-semibold flex-nowrap">
                    <p className="">Mumbai Indians</p>
                    <p>Royal Challneges Banglore</p>
                  </div>
                  <div className=" grid text-[7px] lg:text-xs gap-2  gap-x-2  grid-cols-2 ml-3">
                    <div>C</div>
                    <div>D</div>
                    <div>E</div>
                    <div>F</div>
                    <div>
                      <span className="px-1 rounded-sm bg-white text-black">
                        1
                      </span>
                    </div>

                    <div>
                      <span className="px-1 rounded-sm bg-white text-black">
                        2
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-[56%] lg:w-[50%] grid text-[7px] lg:text-xs gap-2 gap-x-[35px] grid-cols-4 ">
                <div>C</div>
                    <div>D</div>
                    <div>E</div>
                    <div>F</div>
                    <div>C</div>
                    <div>D</div>
                    <div>E</div>
                    <div>F</div>
                  <div>
                    <span className="px-1 rounded-sm bg-white text-black">
                      P
                    </span>
                  </div>
                  <div>
                    <span className="px-1 rounded-sm bg-white text-black">
                      A
                    </span>
                  </div>
                  <div>
                    <span className="px-1 rounded-sm bg-white text-black">
                      DF
                    </span>
                  </div>
                  <div>
                    <span className="px-1 rounded-sm bg-white text-black">
                      SB
                    </span>
                  </div>
                </div>
              </div>
            </div>
        
      </div>
    </div>
  );
};

export default TennisScore