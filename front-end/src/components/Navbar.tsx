import React, { useState } from "react";

import "./css/Navbar.css";
import Button from "./UI/Button";
import Donate from "./Donate";

const Navbar = (props: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                <button className="donateBtn" onClick={() => setIsOpen(true)}>
                    Donate
                </button>
            </div>
            {isOpen ? (
                <Donate
                    onSetIsOpen={setIsOpen}
                    account={props.account}
                    web3={props.web3}
                    donate={props.donate}
                />
            ) : undefined}
        </nav>
    );
};

export default Navbar;
