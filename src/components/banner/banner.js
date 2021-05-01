import React from 'react';
import img from './img/logo.png';
import './banner.css';

const Banner = () => {

  return (
    <>
      <div id="banner" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img} className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner;