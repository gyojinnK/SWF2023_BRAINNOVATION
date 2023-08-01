import React from "react";

import "./css/DonateList.css";
import DonateListCon from "./DonateListCon";

const DonateList = () => {
    return (
        <div className="donateListWrap">
            <p className="donateList_caption">실시간 기부 리스트</p>
            <p className="donateList_caption_dd">
                실시간 기부 현황을 통해 <br />
                따듯한 마음을 서로 공유할 수 있어요.
            </p>
            <DonateListCon />
        </div>
    );
};

export default DonateList;
