import React from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header_logo">My-Zone</div>
      <div className="header_option">
        <span className="header_delivery">Delivery to Guest</span>
        <span className="header_deliveryAddr">choose location</span>
      </div>
      <div className="header_search">
          <div className="header_searchCatogory">All^</div>
        <input className="header_searchInput" type="text" />
        <BiSearchAlt2 className="header_searchIcon" />
      </div>
      <div className="header_nav">
          {/* TODO */}
        <div className="header_option">lang^</div>
        <div className="header_option">
          <span className="header_optionLineOne">Hello, Guest</span>
          <span className="header_optionLineTwo">Sign In</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Order</span>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>

        <div className="header_optionBasket">
          <span className="header_optionLineTwo header_basketCount">0</span>
          <RiShoppingCartLine className="header_cart" />
        </div>
      </div>
    </div>
  );
}

export default Header;
