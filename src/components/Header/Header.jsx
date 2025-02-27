// import React from 'react'
import classes from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utility/firebase"

function Header() {
  const [{user,basket},dispatch]=useContext(DataContext)
  console.log(basket)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>

              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="all">All</option>
              {/* <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="furniture">Furniture</option> */}
            </select>
            <input type="text" name="" id="" placeholder="search product" />

            <BsSearch size={38} />
          </div>

          <div className={classes.order__container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png?20151118161041"
                alt=""
              />
              <select name="" id="">
                <option value="en">EN</option>
              </select>
            </Link>

            <Link to={ !user &&  "/auth"}>
            <div>
              {
                user?(
                  <>
                  <p>Hello,{user?.email?.split('@')[0]} </p>
                  <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>


              ):
                (

                <>

                <p>Hello,Sign In</p>
                <span>Account & Lists</span>
                </>


              )

              }

            </div>


            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{basket.length}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
