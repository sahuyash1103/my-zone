import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { removeToken } from "../../services/authService";
import "./Header.css";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      removeToken();
      dispatch({
        type: "SET_USER",
        user: null
      });
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <div className="header_logo">My-Zone</div>
      </Link>
      <div className="header_option hide_onMobile">
        <span className="header_delivery">Delivery to Guest</span>
        <span className="header_deliveryAddr">choose location</span>
      </div>
      <div className="header_search">
        <div className="header_searchCatogory">
          <span>All</span>
          <span>
            <IoMdArrowDropdown />
          </span>
        </div>
        <input className="header_searchInput" placeholder="Search My Zone" type="text" />
        <AiOutlineSearch className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <div className="header_optionLang">
          <span>Eng</span>
          <IoMdArrowDropdown className="header_optionLangArrow" />
        </div>
        <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className="header_option">
            <span className="header_optionLineOne">Hello, {!user ? "Guest" : user.username}</span>
            <span className="header_optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>
        <Link to='/orders'>
          <div className="header_option hide_onMobile">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Order</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div className="header_optionBasket">
            <RiShoppingCartLine className="header_cart" />
            <span className="header_basketCount">{user?.cart?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
