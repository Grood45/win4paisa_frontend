"use client";
import "./globals.css";

import { Inter } from "next/font/google";
import ReduxProviders from "./redux-arch/provider";
import { usePathname, useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

import LayoutComponent from "./LayoutComponent";
import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const whatsappLink = 'https://wa.me/message/FM3QZSPGT4K6P1';

  return (
    <html lang="en">
      <body className={inter.className}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
        <ReduxProviders>
          <NextTopLoader
            color="red"
            initialPosition={0.08}
            crawlSpeed={200}
            height={2}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
         <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />

          {pathname.includes("admin") ||
          pathname.includes("signin") ||
          pathname.includes("sportLogin") ||

          pathname.includes("sportsAdmin") ||
          pathname.includes("sportAdmin") ||

          pathname.includes("/sports/") ? (
            <>{children}</>
          ) : (
            <div>
              <LayoutComponent>{children}</LayoutComponent>
            </div>
          )}

          
             {/* <div className="mb-[100px] lg:mb-[0px] ">  <TawkToWidget/></div> */}
        </ReduxProviders>
      </body>
    </html>
  );
}


declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

const TawkToWidget: React.FC = () => {
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    const loadTawkTo = () => {
      var s1 = document.createElement("script");
      s1.async = true;
      s1.src = "https://embed.tawk.to/653dfbbea84dd54dc486534d/1hdt1uprs";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      document.head.appendChild(s1);

      window.Tawk_API.onload = function () {
        // Tawk_API object should be available after the script is loaded
        window.Tawk_API.setAttributes({
          username: "Test Name",
          email: "email@email.com",
      
        });
      };
    };

    loadTawkTo();
  }, []);

  return null;
};