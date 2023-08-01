import React from "react";

import "./css/DonateState.css";
import DonateStateCon from "./DonateStateCon";
import DonateStateDisc from "./DonateStateDisc";

const DonateState = () => {
    return (
        <div className="dStateWrap">
            <p className="dState_caption">기부 현황</p>
            <DonateStateCon />
            <DonateStateDisc />
        </div>
    );
};

export default DonateState;
