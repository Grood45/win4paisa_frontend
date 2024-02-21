
import "./admin.css"

import { Inter } from "next/font/google";
import Sidebar from "@/components/admin/Sidebar";
import TopNavbar from "@/components/admin/TopNavbar";

import MobileNavbar from "@/components/admin/MobileNavbar";
import PrivateRoute from "@/components/admin/PrivateRoute";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

 
  return (
    <html lang="en">
      <PrivateRoute>
      <body className={inter.className}>
        <div  className="bg ">
          <div className="flex  p-0 lg:p-2 gap-5 ">
            <div className="hidden lg:contents">
              <Sidebar setShow={''} status={0} />
            </div>
           
            <div className="mt-[20px] w-[98%] lg:w-[90%] m-auto">
              <div className={` hidden lg:contents `}>
                <TopNavbar />
              </div>
              <div className="contents lg:hidden">
                  <MobileNavbar/>
              </div>
              <div>{children}</div>

            </div>
          </div>
        </div>
      </body>
      </PrivateRoute>
    </html>
  );
}
