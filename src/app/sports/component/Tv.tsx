
import { MdLiveTv } from 'react-icons/md'

import { RxCross2 } from "react-icons/rx";

export default function Tv({eventid,setShowTv}:{eventid:any,setShowTv:any}) {
    return (
      <>
        <div className='fixed z-50  top-[70px] w-[95%] pl-2 sm:pl-0 sm:w-auto sm:right-[10px]'>
          <div className='p-0 rounded-2xl  w-[100%] sm:w-[460px]' >
            <div style={{padding:'0px',borderRadius:'14px'}}>
            <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...  p-[1px] rounded-2xl ">
          
            <div className='h-[255px]  rounded-[18px] bg-gray-300 lg:h-[280px]'>
            <div className="absolute rounded-[50%] border bg-[#F3AF06] h-[30px] w-[30px] flex items-center justify-center  top-1 right-1">
            <RxCross2 style={{cursor:'pointer'}}  color="white" fontSize={"20px"} onClick={()=>setShowTv(false)}  />
 
            </div>
            <iframe className='text-white rounded-[18px]' src={`https://nlivetv.lagaikhaipro.com/rtv.php?eventId=${eventid}`} width="100%" height="100%"  color='white' frameBorder="0" allowFullScreen ></iframe>

            </div>
            </div>
            </div>
  
          
          </div>
         
        </div>
      </>
    )
  }