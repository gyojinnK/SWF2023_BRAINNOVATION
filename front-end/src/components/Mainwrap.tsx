import React from "react";
import "./css/Mainwrap.css";
import Navbar from "./Navbar";
import Mypage from "./Mypage";
import Shop from "./Shop";

const Mainwrap = () => {
    return (
        <div className="mainWrap">
            <Navbar />
            <Mypage />
            <Shop />
        </div>
    );
};

export default Mainwrap;
