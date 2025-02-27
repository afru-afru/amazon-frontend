import { useParams } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut";
import axios from "axios";
import { useEffect, useState } from "react";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Product ID:", productId); // Log the product ID
    const url = `${productUrl}/products/${productId}`;
    console.log("Fetching from URL:", url); // Log the URL

    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        console.log("API Response:", res); // Log API response
        setProduct(res.data);
        setLoading(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err); // Log error
        setError("Failed to fetch product details.");
        setLoading(false);
        setIsLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
