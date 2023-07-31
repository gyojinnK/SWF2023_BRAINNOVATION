import React from "react";

import "./css/ItemList.css";
import ItemInfo from "./ItemInfo";
import clothes from "../datas/clothes.json";

const ItemList = () => {
    return (
        <div className="iListWrap">
            {clothes.map((item) => (
                <ItemInfo url={item.url} name={item.name} cost={item.cost} />
            ))}
            ;
        </div>
    );
};

export default ItemList;
