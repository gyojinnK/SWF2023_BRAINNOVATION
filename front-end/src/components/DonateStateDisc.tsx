import React from "react";

import "./css/DonateStateDisc.css";

const DonateStateDisc = () => {
    return (
        <div className="dState_dscriptionWrap">
            <div className="dState_d_amountsWrap">
                <p className="dState_d_amount_caption">현재 기부금액</p>
                <p className="dState_d_amount">3,000,000원</p>
            </div>
            <div className="dState_sepor"></div>
            <div className="dState_d_goalWrap">
                <p className="dState_d_goal_caption">목표 금액</p>
                <p className="dState_d_goal">10,000,000원</p>
            </div>
        </div>
    );
};

export default DonateStateDisc;
