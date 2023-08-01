import React from "react";

import "./css/GCsales.css";

import item1 from "../img/clothes/item1.png";
import item2 from "../img/clothes/item2.png";
import item3 from "../img/clothes/item3.png";
import item4 from "../img/clothes/item4.png";
import item5 from "../img/clothes/item5.png";
import item6 from "../img/clothes/item6.png";
import item7 from "../img/clothes/item7.png";
import item8 from "../img/clothes/item8.png";
import xicon from "../img/xicon.png";

const GCsales = (props: any) => {
    let clotheItems = [item1, item2, item3, item4, item5, item6, item7, item8];

    const closeHandler = () => {
        props.onIsOpen(false);
    };

    return (
        <div className="totalWrap">
            <div className="gcsale_Background" onClick={closeHandler}></div>
            <div className="gcsaleWrap">
                <img className="x" src={xicon} alt="x" onClick={closeHandler} />
                <p className="gc_buy">구매하기</p>
                <div className="gc_underBar"></div>
                <div className="gc_imgCon">
                    <img
                        className="gc_img"
                        alt="product"
                        src={clotheItems[props.clickedIndex]}
                    ></img>
                    <div className="gc_conWrap">
                        <p className="gc_porName">{props.name}</p>
                        <div className="gc_cocount">
                            <p className="gc_cost">{props.cost} GC</p>
                            <p className="gc_count">수량 : 1개</p>
                        </div>
                    </div>
                </div>
                <div className="gc_underBar2"></div>
                <div className="gc_totalcostWrap">
                    <p className="gc_totalcost_txt">총 상품 금액</p>
                    <p className="gc_totalcost_cost">{props.cost} GC</p>
                </div>
                <div className="gc_underBar3"></div>
                <div className="gc_mineGCWrap">
                    <p className="gc_mineGC_txt">소유 GC</p>
                    <p className="gc_mineGC_gc"> GC</p>
                </div>
                <div className="gc_stillGCWrap">
                    <p className="gc_stillGC_txt">잔여 GC</p>
                    <p className="gc_stillGC_gc"> GC</p>
                </div>
                <button className="gc_buy_btn">구매하기</button>
            </div>
        </div>
    );
};

export default GCsales;
