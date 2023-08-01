import React, { useState } from "react";

import "./css/Donate.css";
import xicon from "../img/xicon.png";
import donateIMG from "../img/donateImg.png";

const Donate = (props: any) => {
    const [values, setValues] = useState<{
        address: string;
        donationCost: string;
    }>({
        address: props.accounts,
        donationCost: "",
    });

    const closeHandler = () => {
        props.onSetIsOpen(false);
    };

    const changeHandler = (e: any) => {
        setValues({
            address: props.account,
            donationCost: e.target.value,
        });
    };

    const submitHandler = async (e: any) => {
        e.preventDefault();
        let ethToWei = parseFloat(values.donationCost) * 1000000000000000000;
        if (props.donate) {
            let resp = props.donate.methods
                .donate()
                .send({ from: props.account, value: ethToWei });
            console.log(resp);
        }
    };

    return (
        <div className="totalWrap">
            <div className="dnsale_Background" onClick={closeHandler}></div>
            <form className="dnsaleWrap" onSubmit={submitHandler}>
                <img className="x" src={xicon} alt="x" onClick={closeHandler} />
                <p className="dn_buy">기부하기</p>
                <div className="dn_underBar"></div>
                <div className="dn_imdnon">
                    <img className="dn_img" alt="dn" src={donateIMG}></img>
                    <div className="dn_conWrap">
                        <p className="dn_porName">[유니셰프한국위원회]</p>
                        <p className="dn_dd">
                            유니세프와 함께하는 난민 돕기 캠페인
                        </p>
                        <p className="dn_date">
                            모금 기간 : 2023.07.31 ~ 2023.09.30
                        </p>
                    </div>
                </div>
                <div className="dn_underBar2"></div>
                <div className="dn_totalcostWrap">
                    <p className="dn_totalcost_txt">기부 금액</p>
                    <div className="dn_donateSendWrap">
                        <input
                            className="dn_totalcost_cost"
                            type="text"
                            name="donationCost"
                            onChange={changeHandler}
                            value={values.donationCost}
                        />
                        <p className="dn_eth">ETH</p>
                    </div>
                </div>
                <div className="dn_underBar3"></div>
                <div className="dn_minednWrap">
                    <p className="dn_minedn_txt">소유 ETH</p>
                    <p className="dn_minedn_dn"> ETH</p>
                </div>
                <div className="dn_stilldnWrap">
                    <p className="dn_stilldn_txt">잔여 ETH</p>
                    <p className="dn_stilldn_dn"> ETH</p>
                </div>
                <div className="dn_transferWrap">
                    <p className="dn_transfer_txt">지급 GC</p>
                    <p className="dn_transfer_dn"> GC</p>
                </div>
                <button type="submit" className="dn_donate_btn">
                    구매하기
                </button>
            </form>
        </div>
    );
};

export default Donate;
