import React, { useEffect, useState } from "react";

import "./css/DonateStateCon.css";
import ddabong from "../img/ddabong.png";

const DonateStateCon = (props: any) => {
    const [joinCnt, setJoinCnt] = useState<number>();

    useEffect(() => {
        getDonorsHandler();
    }, [props.account]);

    const getDonorsHandler = async () => {
        if (props.donate) {
            let donors = await props.donate.methods.getDonors().call();
            setJoinCnt(Number.parseInt(donors));
        }
    };

    return (
        <div className="dsCon">
            <div className="dsCon_header">
                <img className="dsCon_img" alt="ddabong" src={ddabong}></img>
                <div className="dsCon_boxWrap">
                    <div className="dsCon_dDay">D - 213</div>
                    <div className="dsCon_cnt">참여자: {joinCnt}명</div>
                </div>
            </div>
            <div className="dsCon_graphWrap">
                <div className="dsCon_graph_frame">
                    <div className="dsCon_graph_elem">
                        <p className="dsCon_graph_per"></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonateStateCon;
