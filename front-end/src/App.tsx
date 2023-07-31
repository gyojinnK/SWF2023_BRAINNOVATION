import React, { useEffect, useState } from "react";
import { useWeb3 } from "./hooks/useWeb3";
import "./App.css";

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
            <h1>Hello CRA-TS!</h1>
            {isLogin ? (
                <>
                    <div>
                        <h3>Accounts Info</h3>
                        <ul>
                            <li>Account : {account}</li>
                            <li>Balance : {balance} ETH</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Transaction</h3>
                        <form action="" onSubmit={fireTx}>
                            <ul>
                                <li>
                                    <input
                                        type="text"
                                        id="received"
                                        placeholder="받을 사람"
                                        onChange={changeReceived}
                                    />
                                </li>
                                <li>
                                    <input
                                        type="text"
                                        id="amount"
                                        placeholder="보낼 금액"
                                        onChange={changeAmount}
                                    />
                                </li>
                                <li>
                                    <button type="submit">전송!!</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </>
            ) : (
                <div>메타마스크 설치해주세여</div>
            )}
        </div>
    );
}

export default App;
