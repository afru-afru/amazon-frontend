import LayOut from "../../components/LayOut/LayOut"
import { useParams } from "react-router-dom"
import axios from "axios"
import { productUrl } from "../../Api/endPoints"
import { useEffect, useState } from "react"
import ProductCard from "../../components/Product/ProductCard"
import classes from './result.module.css'
import Loader from "../../components/Loader/Loader"

function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const[isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    if (categoryName) {
      axios.get(`${productUrl}/products/category/${categoryName}`)
        .then((res) => {
          console.log("API Response:", res); // Log entire response
          console.log("Data:", res.data); // Log just the data
          setResults(res.data); // Set results
          setIsLoading(false)
        })
        .catch((err) => {
          console.error("API Error:", err);
          setIsLoading(false) // Log any errors
        });
    }
  }, [categoryName]);

  useEffect(() => {
    console.log("Updated Results:", results); // Log updated results
  }, [results]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category: {categoryName}</p>
        <hr />
        {isLoading?(<Loader/>):(
            <div className={classes.products_container}>
            {
              results.length > 0 ? (
                results.map((product) => (
                  <ProductCard key={product.id} product={product} renderDesc={false} renderAdd={true} />
                ))
              ) : (
                <p>No results found.</p> // Show message if no results
              )
            }
          </div>
        )}

      </section>
    </LayOut>
  );
}

export default Results;