import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div className="header_logo">My-Zone</div>
      </Link>
      <div className="header_option">
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
        <input className="header_searchInput" type="text" />
        <AiOutlineSearch className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <div className="header_optionLang">
          <span>Eng</span>
          <IoMdArrowDropdown className="header_optionLangArrow" />
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Hello, Guest</span>
          <span className="header_optionLineTwo">Sign In</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Order</span>
        </div>
        {/* <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div> */}

        <Link to="/checkout">
          <div className="header_optionBasket">
            <RiShoppingCartLine className="header_cart" />
            <span className="header_basketCount">{0}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
