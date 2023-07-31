import React from "react";

import "./css/ItemInfo.css";

const ItemInfo = (props: any) => {
    return (
        <div className="iInfoWrap">
            <div
                className="item__img"
                style={{
                    background: `url("${props.url}") no-repeat center center`,
                }}
            ></div>
            <p className="item__name">{props.name}</p>
            <p className="item__cost">{props.cost}</p>
        </div>
    );
};
export default ItemInfo;
