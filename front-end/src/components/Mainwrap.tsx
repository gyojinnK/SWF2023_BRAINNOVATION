import React from "react";
import "./css/Mainwrap.css";
import Navbar from "./Navbar";
import Mypage from "./Mypage";
import Shop from "./Shop";
import DonateList from "./DonateList";
import DonateState from "./DonateState";

const Mainwrap = (props: any) => {
    return (
        <div className="mainWrap">
            <Navbar account={props.account} donate={props.donate} />
            <Mypage balance={props.balance} account={props.account} />
            <Shop />
            <DonateState
                account={props.account}
                web3={props.web3}
                donate={props.donate}
            />
            <DonateList />
        </div>
    );
};

export default Mainwrap;
