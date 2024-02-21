import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { fetchGetRequest } from '@/api/api';
import { useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux-arch/store';

import img1 from "../../asset/carouselmg/cimg1.jpg";
import img2 from "../../asset/carouselmg/cimg2.jpg";
import img3 from "../../asset/carouselmg/cimg3.jpg";
import img4 from "../../asset/carouselmg/cimg4.jpg";
import img5 from "../../asset/carouselmg/cimg5.jpg";

const Carousel = () => {
  const images = [img1, img2, img3, img4, img5];
  const [sliderdata, setSliderData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const toast = useToast();

  const SliderFn = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/gameslider/get-slider/6551e31439cda85a6c606fef`
      );
      setSliderData(response.data);
    } catch (error: any) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    SliderFn();
  }, []);

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: '20%', // Adjust this value to control how much of the adjacent images are visible
    slidesToShow: 1, // Show only one slide at a time on all devices
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    arrows: false,
    afterChange: (index: number) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
    centerMode: false,

        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const goToSlide = (index: any) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="custom-carousel w-[100%] mt-0 relative">
      <Slider ref={sliderRef} {...settings}>
        {sliderdata?.map((item, index) => {
          return (
            <div key={index} className="w-[100%] md:w-[96%]  relative">
              <img src={item} className="w-[100%] md:w-[97%] h-[145px] lg:h-[185px] rounded-[8px] lg:rounded-[10px]" alt="" />
            </div>
          );
        })}
      </Slider>

      <ul className="slick-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex">
        {sliderdata?.map((item, index) => {
          const dotStyle = {
            width: index === currentSlide ? '20px' : '10px',
            height: '10px',
            background: index === currentSlide ? '#FBC032' : '#FBC032',
            borderRadius: index === currentSlide ? '20%' : '50%',
            marginLeft: '0px',
          };

          return (
            <li key={index} style={dotStyle} onClick={() => goToSlide(index)}></li>
          );
        })}
      </ul>
    </div>
  );
};

export default Carousel;
