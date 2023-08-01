import React from "react";

import "./css/DonateListItem.css";

const DonateListItem = () => {
    return (
        <li className="diWrap">
            <div className="di_contentWrap">
                <p className="di_content">addr</p>
                <p className="di_content">time</p>
                <p className="di_content">donation ETH</p>
            </div>
            <div className="di_under"></div>
        </li>
    );
};

export default DonateListItem;
