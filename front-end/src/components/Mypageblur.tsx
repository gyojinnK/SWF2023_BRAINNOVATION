import React from "react";

import "./css/Mypageblur.css";

const Mypageblur = () => {
    return (
        <div className="pageblurWrap">
            <div className="pageblur__content">
                <div className="pageblur__bold">
                    <p>가나다 라마 바사아 자차카타</p>
                    <p>파하가 나다라마 바사아자차카</p>
                </div>
                <div className="pageblur__dd">
                    <p>가나다 라마 바사아 자차카타</p>
                    <p>파하가 나다라마 바사아자차카</p>
                </div>
                <button className="pageblur_btn">My page</button>
            </div>
        </div>
    );
};

export default Mypageblur;
