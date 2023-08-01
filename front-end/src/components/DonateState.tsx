import React from "react";

import "./css/DonateState.css";
import DonateStateCon from "./DonateStateCon";
import DonateStateDisc from "./DonateStateDisc";

const DonateState = (props: any) => {
    return (
        <div className="dStateWrap">
            <p className="dState_caption">기부 현황</p>
            <DonateStateCon
                account={props.account}
                web3={props.web3}
                donate={props.donate}
            />
            <DonateStateDisc
                account={props.account}
                web3={props.web3}
                donate={props.donate}
            />
        </div>
    );
};

export default DonateState;
