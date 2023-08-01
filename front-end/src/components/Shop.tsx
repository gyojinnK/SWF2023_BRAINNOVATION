import React from "react";

import "./css/Shop.css";
import Shopheader from "./Shopheader";
import Shopcontents from "./Shopcontents";

const Shop = () => {
    return (
        <div className="shopWrap">
            <p className="shop__caption">스토어</p>
            <Shopheader />
            <Shopcontents />
        </div>
    );
};

export default Shop;
