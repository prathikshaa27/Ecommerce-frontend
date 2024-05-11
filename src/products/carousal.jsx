import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css'

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 3000, 
  }
  return (
    <Slider {...settings}>
      <div>
        <img src= "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618571140235/mobile-offers.jpg" alt="Image 1" />
      </div>
      <div>
        <img src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1618548899692/groceries-offers.jpg" alt="Image 2" />
      </div>
      <div>
        <img src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1621488513434/today-electronics-offers.jpg" alt="Image 2" />
      </div>
      <div>
        <img src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1617875488697/clothing-offers.jpg" alt="Image 2" />
      </div>
      <div>
        <img src="https://cdn.grabon.in/gograbon/images/web-images/uploads/1620391897153/furniture-coupons.jpg" alt="Image 2" />
      </div>
    </Slider>
  );
};

export default CarouselComponent;
