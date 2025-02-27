// import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { img } from './data';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './Carousel.module.css'

function Carousell() {
  return (
    <div>
      <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={true} >
{
    img.map((imageItemLink,i)=>{
        return <img  key={i}  src={imageItemLink}/>
    })
}
        </Carousel>
        <div className={classes.hero__img}>


        </div>
        </div>
  )
}

export default Carousell

