"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SportsBookCarousel = ({
  gameTypeData,
  handleGame,
  value
}: {
  gameTypeData?: any;
  handleGame?: any;
  value?:any
}) => {
  const settings = {
    centerMode: false,
    infinite: true,
    slidesToShow: value===1?4:3,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
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
        {gameTypeData?.map((game: any) => (
          <div key={game.id} className="p-2 cursor-pointer">
            <div
              onClick={() => handleGame(game.name)}
              key={game.gameId}
              className="card w-[100%]"
            >
              <div className="background"></div>
              <img
                src={game.image}
                className="h-[130px] w-[100%] rounded-[10px]"
              />
              <div className="logo font-bold text-red-500">Play</div>

              <div className="box box1">
                <p className="text-black font-bold text-left mt-6">
                  {" "}
                  {game.name}
                </p>
              </div>

              <div className="box box4"></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};



export default SportsBookCarousel;
