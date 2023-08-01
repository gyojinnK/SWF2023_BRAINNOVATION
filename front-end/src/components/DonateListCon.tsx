import React from "react";

import "./css/DonateListCon.css";
import DonateListItem from "./DonateListItem";

const DonateListCon = () => {
    return (
        <div className="listConWrap">
            <div className="listCon_header">
                <p className="listCon_header_title">Address</p>
                <p className="listCon_header_title">Time</p>
                <p className="listCon_header_title">Donation (ETH)</p>
            </div>
            <DonateListItem />
        </div>
    );
};

export default DonateListCon;
