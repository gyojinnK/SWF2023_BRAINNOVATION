import React, { useState } from "react";

import "./css/Mypage.css";
import Mycharacter from "./Mycharacter";
import Myinfo from "./Myinfo";
import Mypageblur from "./Mypageblur";

const Mypage = () => {
    const [isHidden, setIsHidden] = useState<boolean | any>(false);

    const onBlurHiddenHandler = (hidden: boolean) => {
        setIsHidden(hidden);
    };

    return (
        <div className="mypageWrap">
            <p className="mypage__caption">Community</p>

            {isHidden ? undefined : (
                <Mypageblur onBlurHiddenHandler={onBlurHiddenHandler} />
            )}
            <div className="mypage__content">
                <Mycharacter />
                <Myinfo />
            </div>
        </div>
    );
};

export default Mypage;
