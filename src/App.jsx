import { useContext } from "react";
import "./App.css";

// import Header from "../src/components/Header/Header";
import Routing from "./Router"
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type } from "./Utility/actiontype";
import { auth } from "./Utility/firebase";
import { useEffect } from "react";

function App() {
  const [{user},dispatch]=useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser);
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null,
        })
      }
    })
  },[])
  return (
    <div>




      <Routing></Routing>

   </div>
  );
}

export default App;
