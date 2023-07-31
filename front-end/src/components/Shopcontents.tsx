import React from "react";

import "./css/Shopcontents.css";
import ShopConBtn from "./ShopConBtn";
import ItemList from "./ItemList";

const Shopcontents = () => {
    return (
        <div className="shopcontentsWrap">
            <p className="shopcontents__caption">Recommand</p>
            <ShopConBtn />
            <ItemList />
        </div>
    );
};

export default Shopcontents;
