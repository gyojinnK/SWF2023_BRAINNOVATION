import React, { useEffect, useState } from "react";

import "./css/DonateStateDisc.css";

const ethCost = 2400000;

const DonateStateDisc = (props: any) => {
    const [weiToKrw, setWeiToKrw] = useState<BigInt | number | any>();

    useEffect(() => {
        getTotalDonationsHandler();
    }, [props.account]);

    const getTotalDonationsHandler = async () => {
        if (props.donate && props.web3) {
            try {
                console.log("props.donate:", props.donate);
                console.log("props.web3:", props.web3);

                let totalDonationWei = await props.donate.methods
                    .getTotalDonations()
                    .call();

                console.log("totalDonationWei:", totalDonationWei);

                if (totalDonationWei) {
                    let weiToEth = props.web3.utils.fromWei(
                        totalDonationWei,
                        "ether"
                    );
                    setWeiToKrw(weiToEth);
                } else {
                    console.warn(
                        "totalDonationWei 값이 유효하지 않습니다:",
                        totalDonationWei
                    );
                }
            } catch (error) {
                console.error("계산 도중 오류가 발생하였습니다:", error);
            }
        }
    };

    return (
        <div className="dState_dscriptionWrap">
            <div className="dState_d_amountsWrap">
                <p className="dState_d_amount_caption">현재 기부금액</p>
                <p className="dState_d_amount">{weiToKrw} ETH</p>
            </div>
            <div className="dState_sepor"></div>
            <div className="dState_d_goalWrap">
                <p className="dState_d_goal_caption">목표 금액</p>
                <p className="dState_d_goal">0.5 ETH</p>
            </div>
        </div>
    );
};

export default DonateStateDisc;
