import LayOut from "../../components/LayOut/LayOut";
import Carousel from "../../components/Carousel/Carousell"
import Category from "../../components/Catagories/Catagory"

import Product from "../../components/Product/Product";
function Landing() {
  return (
    <LayOut>
       <Carousel/>
      <Category/>
      <Product/>
    </LayOut>
  )
}

export default Landing
