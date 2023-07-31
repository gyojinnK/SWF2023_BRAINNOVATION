import React, { useEffect, useState } from "react";
import { useWeb3 } from "./hooks/useWeb3";
import "./App.css";

import Mainwrap from "./components/Mainwrap";

function App() {
    const [account, web3] = useWeb3();
    const [isLogin, setIsLogin] = useState<Boolean>();
    const [balance, setBalance] = useState<number>();
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [received, setReceived] = useState<string | undefined>(undefined);

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

    return (
        <div className="App">
            <Mainwrap />
        </div>
    );
}

export default App;
