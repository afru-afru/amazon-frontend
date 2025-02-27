import LayOut from "../../components/LayOut/LayOut";
import { useState } from "react";
import classes from "./payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { useContext } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstanc } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/actiontype";
function Payment() {
  const [cardError, setCardError] = useState(null);
  const [{ user, basket },dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate()

  const handleChange = (e) => {
    e.error?.message ? setCardError(e.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      //backend contact
      const response = await axiosInstanc({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);

      //client side confirmation
      const clientSecret = response.data?.clientSecret;
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent)

      //after confirmation,orders save firestore database
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        //empty the basket
        dispatch({type:Type.EMPTY_BASKET})
      setProcessing(false);
      navigate("/orders",{state:{msg:"you have placed now order"}})
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Deliver Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React leme</div>
            <div>Chicaco, It</div>
          </div>

        </div>
        <hr/>

        <div className={classes.flex}>
          <h3>Review Items and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange}></CardElement>
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order |{" "}
                      <CurrencyFormat amount={total}></CurrencyFormat>
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p> Please wait </p>
                      </div>
                    ) : (
                      "pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
