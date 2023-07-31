import React, { useState } from "react";

import "./css/ShopConBtn.css";

const ShopConBtn = () => {
    const [btnClick, setBtnClick] = useState<Number[] | any>([0, 0]);

    const underBarStyle =
        btnClick[1] == 1
            ? {
                  left: "100px",
              }
            : undefined;

    return (
        <div className="shopConBtnWrap">
            <button className="scBtn" onClick={() => setBtnClick([1, 0])}>
                Clothes
            </button>
            <button className="scBtn" onClick={() => setBtnClick([0, 1])}>
                Acc
            </button>
            <div className="scBtn__underWrap">
                <div
                    className="scBtn__underWrap_el"
                    style={underBarStyle}
                ></div>
            </div>
        </div>
    );
};

export default ShopConBtn;
