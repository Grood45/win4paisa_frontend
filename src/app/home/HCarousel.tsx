'use client'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

import img1 from '../../assetuser/other/Akbar-Romeo-Walter.webp';
import img2 from '../../assetuser/other/Andar-Bahar.webp';

const HCarousel = ({casinodata,title}:{casinodata:any,title?:any}) => {
  
  const settings = {
    centerMode: false,
    infinite: true,
    slidesToShow: title==='sport'?5:4,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: title==='sport'?4000:3000,
    dots: false, // Remove the dots
    arrows: false,
    responsive: [
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 792,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="custom-carousel w-[100%]  mt-2">
      <Slider {...settings}>
        {casinodata.map((image:any, index:any) => (
          <>
          {title==='sport'?<div className="p-2 w-[95%] bg-[#212632] lg:bg-[#15191E] rounded-[8px]">
                  <Image src={image.img} alt="" />
                </div>:  <div key={index}>
            <Image
              className="w-[95%] h-[140px]  rounded-lg lg:rounded-2xl"
              src={image.img}
              alt={`Image ${index}`}
            />
          </div>}
          </>
        
        ))}
      </Slider>
    </div>
  );
};

export default HCarousel;
