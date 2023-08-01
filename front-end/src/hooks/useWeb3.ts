import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3, { Contract } from "web3";

import { useEffect, useState } from "react";

let donateAddress = "0x6e6dAbBF8f464B90336b8BaD48a306e09D8492EB";
let donateABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "donator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "GC",
                type: "uint256",
            },
        ],
        name: "CREATEGC",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "donator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "donation",
                type: "uint256",
            },
        ],
        name: "DONATION",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "GC",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "GCs",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "donators",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "donors",
        outputs: [
            {
                internalType: "address payable",
                name: "donator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "donation",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "items",
        outputs: [
            {
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "purchased",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
    },
    {
        inputs: [],
        name: "donate",
        outputs: [],
        stateMutability: "payable",
        type: "function",
        payable: true,
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "donator",
                type: "address",
            },
        ],
        name: "getDonators",
        outputs: [
            {
                internalType: "uint256",
                name: "result",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
    },
    {
        inputs: [],
        name: "getDonors",
        outputs: [
            {
                internalType: "uint256",
                name: "result",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
    },
    {
        inputs: [],
        name: "getTotalDonations",
        outputs: [
            {
                internalType: "uint256",
                name: "result",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "donator",
                type: "address",
            },
        ],
        name: "createGC",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "donator",
                type: "address",
            },
        ],
        name: "getGC",
        outputs: [
            {
                internalType: "uint256",
                name: "result",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "itemPrice",
                type: "uint256",
            },
        ],
        name: "createItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "donator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "itemId",
                type: "uint256",
            },
        ],
        name: "buyItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

export const useWeb3 = (): [any, string, Web3 | any] => {
    const [account, setAccount] = useState<string>("");
    const [web3, setWeb3] = useState<Web3 | undefined>();
    const [donate, setDonate] = useState<any>();

    /**
     * @dev 현재 metamask의 chainId를 요청
     * @returns 현재의 chainId
     */
    const getCurChainId = async () => {
        const eth = window.ethereum as MetaMaskInpageProvider;
        const curChainId = await eth.request({
            method: "eth_chainId",
        });

        return curChainId;
    };

    /**
     * @dev 연결할 네트워크 정보 객체를 생성하고 네트워크 추가 요청
     * @param chainId 현재의 chainId
     */
    const addAndConnNetwork = async (chainId: string) => {
        const eth = window.ethereum as MetaMaskInpageProvider;

        const network = {
            chainId,
            chainName: "swfTest",
            rpcUrls: ["http://127.0.0.1:8545"],
            nativeCurrency: {
                name: "Ethereum",
                symbol: "ETH",
                decimals: 18,
            },
        };

        await eth.request({
            method: "wallet_addEthereumChain",
            params: [network],
        });
    };

    /**
     * @dev 현재 metamask의 account(주소)를 요청
     * @returns 현재 account
     */
    const getAccount = async () => {
        const eth = window.ethereum as MetaMaskInpageProvider;

        const account = await eth.request({
            method: "eth_requestAccounts",
        });

        return account;
    };

    useEffect(() => {
        (async function () {
            if (window.ethereum !== undefined) {
                const curChainId = await getCurChainId();
                const targetChainId = "0x1e2a";

                if (curChainId !== targetChainId) {
                    await addAndConnNetwork(targetChainId);
                }

                const [account] = (await getAccount()) as string[];
                setAccount(account);

                const web3 = new Web3((window as any).ethereum);
                setWeb3(web3);

                const donate = new web3.eth.Contract(donateABI, donateAddress);
                setDonate(donate);
            }
        })();
        return () => {};
    });

    return [donate, account, web3];
};
