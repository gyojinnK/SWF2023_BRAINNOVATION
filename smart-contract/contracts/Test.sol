 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Test{
    struct DonatorInfo{
        address payable donator;    // 기부자
        uint256 donation;   // 기부금
    }

    address payable owner;
    uint256 private _totalDonations;
    // address constant internal contractAddr ; 

    DonatorInfo[] public donors;    
    mapping(address => uint256) public donators;

    event DONATION(address indexed donator, uint256 donation);

    constructor() {
        address sender = msg.sender;
        owner = payable(sender);
    }

    function donate() public payable returns (bool result){
        // 기부금이 0 ETH 이상인지
        require(msg.value > 0, 'You must send some ether to donate');
        // 기부자의 기부금을 업데이트
        donators[msg.sender] += msg.value;
        // 기부자가 처음 기부한 경우, donors 배열에 추가
        if(donators[msg.sender] == msg.value){
            DonatorInfo memory d;
            d.donator = owner;
            d.donation = msg.value;
            donors.push(d);
        }

        _totalDonations += msg.value;

        emit DONATION(msg.sender, msg.value);
    }

    function getTotalDonations() public view returns(uint256 result) {
        return _totalDonations;
    }
}