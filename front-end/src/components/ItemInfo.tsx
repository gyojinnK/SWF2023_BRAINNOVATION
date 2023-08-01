import React, { useState } from "react";

import "./css/ItemInfo.css";

const ItemInfo = (props: any) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const hoverHandler = () => {
        setIsHover(true);
    };

    const outHandler = () => {
        setIsHover(false);
    };

    const hoverStyle = isHover
        ? {
              boxShadow: "rgba(0,0,0,0.2) 0px 0px 15px 5px",
          }
        : undefined;

    return (
        <div
            className="iInfoWrap"
            onMouseOver={hoverHandler}
            onMouseOut={outHandler}
        >
            <img
                className="item__img"
                alt="product"
                src={props.src}
                style={hoverStyle}
            />
            <p className="item__name">{props.name}</p>
            <p className="item__cost">{props.cost} GC</p>
        </div>
    );
};
export default ItemInfo;
