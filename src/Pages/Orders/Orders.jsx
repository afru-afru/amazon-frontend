import LayOut from "../../components/LayOut/LayOut"
import { db } from "../../Utility/firebase"
import { DataContext } from "../../components/DataProvider/DataProvider"
import { useContext,useEffect, useState } from "react"
import classes from "./order.module.css"
import ProductCard from "../../components/Product/ProductCard"


function Orders() {
  const [{user},dispatch]=useContext(DataContext);
  const [orders,setOrders]=useState([])
  useEffect(()=>{
if(user){
db.collection("users").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
  // console.log(snapshot)
  setOrders(
    snapshot.docs.map((doc)=>({
      id:doc.id,
      data:doc.data(),

    }))
  )
})

}else{
 setOrders([])

}

  },[])
  return (
    <LayOut>
       <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.map==0&&<div style={{padding:"20px"}}>You dont have orders yet</div>}
          <div>
  {
    orders?.map((eachOrder,i)=>{
      return (
        <div key={i}>
          <hr/>
          <p>Order ID:{eachOrder?.id}</p>
          {
            eachOrder?.data?.basket?.map(order=>
             ( <ProductCard
               flex={true}
               product={order}
               key={`${eachOrder.id}-${order.id}`}

              ></ProductCard>)
            )
          }
        </div>

      )
    })
  }
          </div>
        </div>
       </section>
    </LayOut>
  )
}

export default Orders
