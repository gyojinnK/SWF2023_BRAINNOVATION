import React from "react";

import "./css/Mypage.css";
import Mycharacter from "./Mycharacter";
import Myinfo from "./Myinfo";
import Mypageblur from "./Mypageblur";

const Mypage = () => {
    return (
        <div className="mypageWrap">
            <p className="mypage__caption">Community</p>
            {/* 버튼 이벤트 */}
            <Mypageblur />
            <div className="mypage__content">
                <Mycharacter />
                <Myinfo />
            </div>
        </div>
    );
};

export default Mypage;
