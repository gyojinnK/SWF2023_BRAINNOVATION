import React, { useEffect, useState } from "react";
import { useWeb3 } from "./hooks/useWeb3";
import "./App.css";

import Mainwrap from "./components/Mainwrap";

function App() {
    const [donate, account, web3] = useWeb3();
    const [isLogin, setIsLogin] = useState<Boolean>();
    const [balance, setBalance] = useState<number>();
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [received, setReceived] = useState<string | undefined>(undefined);

    {
        const changeReceived = (e: React.ChangeEvent<HTMLInputElement>) => {
            setReceived(e.target.value);
        };

        const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
            setAmount(Number(e.target.value));
        };

        const fireTx = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await web3?.eth.sendTransaction({
                from: account,
                to: received,
                value: amount,
            });
        };
    }

    // 전체 기부금액 확인
    const getTotalDonations = async () => {
        if (donate) {
            let total = await donate.methods.getTotalDonations().call();
            console.log(total);
        }
    };

    // 현 account의 기부 누적 금액 확인
    const getDonatorsDonation = async () => {
        if (donate && account) {
            let donation = await donate.methods.getDonators(account).call();
            console.log(donation);
        }
    };

    useEffect(() => {
        (async function () {
            const balance = await web3?.eth.getBalance(account);
            if (balance !== undefined) {
                setBalance(Number(balance) / 10 ** 18);
            }
        })();

        if (account === "") {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [account]);

    useEffect(() => {
        getTotalDonations();
        getDonatorsDonation();
    }, [account]);

    return (
        <div className="App">
            <Mainwrap balance={balance} account={account} />
        </div>
    );
}

export default App;
