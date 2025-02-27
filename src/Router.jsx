import { BrowserRouter as  Router,Route,Routes } from "react-router-dom"
import Landing from "./Pages/Landing/Landing"
import SignIn from "./Pages/Auth/Auth"
import Payment from "./Pages/Payment/Payment"
import Orders from "./Pages/Orders/Orders"
import Cart from "./Pages/Cart/Cart"
import Results from "./Pages/Results/Results"
import ProductDetail from "./Pages/ProductDetail/ProductDetail"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"

const stripePromise = loadStripe('pk_test_51QwQCyFWqgQswplhkyzGmQuPMAPcqC679r6HPWGLb9vOtynGGXMC0V1XCYB1k1Z0RmdSXXzRV29CUASpEX67Athi00apyvhCsK');
function Routing() {

  return (
   <Router>
    <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<SignIn/>}/>
        <Route path="/payments" element={
          <ProtectedRoute msg={"you must login to pay"} redirect={"/payments"}>
  <Elements stripe={stripePromise}>
            <Payment/>
          </Elements>


          </ProtectedRoute>


          }/>
        <Route path="/orders" element={
          <ProtectedRoute msg={"you must login to see your orders"} redirect={"/orders"}>
            <Orders/>
          </ProtectedRoute>
          }/>
        <Route path="/category/:categoryName" element={<Results/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/products/:productId" element={<ProductDetail/>}/>



    </Routes>
    </Router>
  )
}

export default Routing
