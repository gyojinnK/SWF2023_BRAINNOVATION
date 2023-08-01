import React from "react";

import "./css/Mycharacter.css";
import ethImg from "../img/ethcoin.png";

const Mycharacter = (props: any) => {
    let finalAcc = "";
    let acc = props.account;
    finalAcc += acc.substr(0, 4);
    finalAcc += "...";
    finalAcc += acc.substr(38, 41);

    return (
        <div className="charWrap">
            <div className="char__view"></div>
            <div className="char_metamask">
                <p className="char_eth_account">Addrss [{finalAcc}]</p>
                <div className="char_metamask_con">
                    <img className="char_coin" src={ethImg}></img>
                    <p className="char_eth_view">보유 ETH</p>
                    <p className="char_eth_amount">{props.balance} ETH</p>
                </div>
            </div>
        </div>
    );
};

export default Mycharacter;
