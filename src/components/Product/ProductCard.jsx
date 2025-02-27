
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from "./product.module.css"
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/actiontype';

function ProductCard({ product={},flex,renderDesc,renderAdd }) {
  const { image, title,id, rating, price, description } = product;
  const[state,dispatch]=useContext(DataContext)

  console.log(state)
  const addToCart=()=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item:{
        image, title,id, rating, price, description
      }
    })
  }


  return (
    <div className={`${classes.card__container} ${flex?classes.product__flexed:''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img__container}/>
      </Link>
      <div className="product-info">
        <h3>{title}</h3>
        {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating.rate} precision={0.1} readOnly />
          {/* Display the number of ratings */}
          <small>({rating.count})</small>
        </div>
        <div className="price">
          {/* Use the CurrencyFormat component to display the price */}
          <CurrencyFormat amount={price} />
        </div>
      {
        renderAdd && <button  className={classes.button} onClick={addToCart}>
        Add to Cart
      </button>
      }
      </div>
    </div>
  );
}

// PropTypes validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description:PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,

    }).isRequired,
  }).isRequired,
  flex: PropTypes.bool,
  renderDesc:PropTypes.bool,
  renderAdd:PropTypes.bool
};

ProductCard.defaultProps = {
  flex: false, // Default value for flex
};

export default ProductCard;