import React from "react";

import "./css/Navbar.css";
import search from "../img/search.png";
import burger from "../img/menu-burger.png";
import Button from "./UI/Button";

const Navbar = () => {
    return (
        <nav>
            <div className="logoWrap">
                <div className="logo__img"></div>
                <div className="logo__txt">giveConnect</div>
            </div>
            <div className="focusBtnWrap">
                <Button>Community</Button>
                <Button>Shop</Button>
                <Button>Organization</Button>
            </div>
            <div className="donateWrap">
                <button className="donateBtn">Donate</button>
            </div>
        </nav>
    );
};

export default Navbar;
