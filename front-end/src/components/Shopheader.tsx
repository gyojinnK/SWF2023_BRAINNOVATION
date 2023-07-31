import React from "react";

import "./css/Shopheader.css";

const Shopheader = () => {
    return (
        <div className="shopheaderWrap">
            <div className="shopheader__content">
                <div className="shopheader__bold">
                    <p>가나다 라마 바사아 자차카타</p>
                    <p>파하가 나다라마 바사아자차카</p>
                </div>
                <div className="shopheader__dd">
                    <p>가나다 라마 바사아 자차카타</p>
                    <p>파하가 나다라마 바사아자차카</p>
                </div>
                <button className="shopheader_btn">View more</button>
            </div>
        </div>
    );
};

export default Shopheader;
