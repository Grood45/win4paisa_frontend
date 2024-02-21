"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import bluecard from "../../../assetuser/other/bluecard.png";
import greencard from "../../../assetuser/other/greencard.png";
import pinkcard from "../../../assetuser/other/pinkcard.png";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux-arch/store";
import hdimg1 from './Card 1 (1).png'
const WCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const userAuth = useSelector((state: RootState) => state);
  const {
    username = "",
    max_limit = 0,
    min_limit = 0 ,
    user_id = "",
    full_name = "",
    amount = 0,
    exposure_limit=0
  } = userAuth?.combineR?.userAuth?.data?.user || {};

  const settings = {
    centerMode: false,
    infinite: true,
    slidesToShow: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
    afterChange: (index: number) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 792,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const walletCards = [
    {
      id: 1,
      title: username,
      userid: user_id,
      ballancetitle: "Available Balance",
      balance: amount,
      img: bluecard,
    },
    {
      id: 2,
      title: username,
      userid: user_id,
      ballancetitle: "Withdraw Balance",
      balance: amount-exposure_limit,
      img: greencard,
    },
    {
      id: 3,
      title: username,
      userid: user_id,
      ballancetitle: "Exposure Balance",
      balance: exposure_limit,
      img: pinkcard,
    },
  ];

  const goToSlide = (index: any) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="custom-carousel w-[100%] mt-2 relative">
      <Slider {...settings}>
        {walletCards.map((item, index) => {
          return (
            <div key={item.id} className="w-[96%] mt-2 relative">
              <Image src={item.img} className="w-[98%]" alt="" />
              <div className="absolute top-0 flex h-[96%] p-4 flex-col justify-between">
                <div>
                  <p className="text-xs font-extralight text-[#FFF]">
                    {item.ballancetitle}
                  </p>
                  <p className="text-xl font-semibold text-[#FFF]">
                    {(item.balance).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-extralight text-[#FFF]">
                    {item.title}
                  </p>
                  <p className="text-md font-semibold text-[#FFF]">
                    {item.userid}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      <ul className="slick-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex">
        {walletCards.map((item, index) => {
          const dotStyle = {
            width: index === currentSlide ? "20px" : "10px",
            height: "10px",
            background: index === currentSlide ? "#FBC032" : "#FBC032",
            borderRadius: index === currentSlide ? "20%" : "50%",
            marginLeft: "0px",
          };

          return (
            <li
              key={index}
              style={dotStyle}
              onClick={() => goToSlide(index)}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};

export default WCarousel;
