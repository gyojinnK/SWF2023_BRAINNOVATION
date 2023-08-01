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
            <Navbar />
            <Mypage balance={props.balance} account={props.account} />
            <Shop />
            <DonateState />
            <DonateList />
        </div>
    );
};

export default Mainwrap;
