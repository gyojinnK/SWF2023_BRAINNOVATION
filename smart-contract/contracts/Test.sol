 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Test{
    struct DonatorInfo{
        address payable donator;    // 기부자
        uint256 donation;   // 기부금
    }

    //캐릭터 정보를 저장하기 위한 구조체를 정의
    struct Character {
        string name;
        uint256 clothes;
        uint256 accessory;
        
    }

    address payable owner;
    uint256 private _totalDonations;
    // address constant internal contractAddr ; 

    DonatorInfo[] public donors;    
    uint256[] public GCs;
    Character[] public character;

    mapping(address => uint256) public donators;
    mapping(address => uint256) public GC;
    mapping(address => uint256) public characters;

    event DONATION(address indexed donator, uint256 donation);
    event CREATEGC(address indexed donator, uint256 GC);

    constructor() {
        address sender = msg.sender;
        owner = payable(sender);
    }

    function donate() public payable {
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

    // 주소 & 기부자의 기부 금액 확인
    function getDonators(address donator) public view returns(uint256 result){
        require(donators[donator] > 0, 'This account did not donate');
        uint256 donation = donators[donator];
        return donation;
    }

    /** 
    * @dev 기부자의 명단 길이 구하기
    * @return result donors배열의 길이
    */
    function getDonors() public view returns(uint256 result){
        uint256 donorslen = donors.length;
        return donorslen;
    }

    // 스마트 컨트랙트 기부 금액 저장소
    function getTotalDonations() public view returns(uint256 result) {
        return _totalDonations;
    }

    // GC 생성소
    function createGC(address donator) public {
        require(donators[donator] > 0 , "You dont't receive GCOIN ");
        uint256 giveGC = calcGC(donator);
        GC[donator] += giveGC;
        
        emit CREATEGC(donator, giveGC);
    }

    //GC 환율계산
    function calcGC(address donator) internal view returns(uint256 result) {
        uint256 donation = donators[donator];
        uint256 dnGC = donation / 10;
        return dnGC;
    }

    //GC 지급소
    function getGC(address donator) external view returns (uint256 result){
           require(GC[donator] > 0, "You don't have GCOIN.");
           return GC[donator];
    }

    function getCharac(address charact) public view returns(uint256 result) {
        require(characters[charact] > 0 , "Yon have nice character");
        uint256 charec = characters[charact];
        return charec;
    

    }
}