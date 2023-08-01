 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Test{
    struct DonatorInfo{
        address payable donator;    // 기부자
        uint256 donation;   // 기부금
        uint256 donatiotime; // 기부 시간
    }


    struct Item {
        uint256 price; // 아이템 가격
        bool purchased; //내가 구매한 아이템인지 아닌지를 확인
    }

    address payable owner;
    uint256 private _totalDonations;
    // address constant internal contractAddr ; 

    DonatorInfo[] public donors;    
    uint256[] public GCs;
    uint256 itemCount = 0 ; 
    uint256 donationTime = block.timestamp;    

    mapping(address => uint256) public donators; 
    mapping(address => uint256) public GC;
    mapping(uint256 =>  Item) public items; // 아이템 ID에 해당하는 아이템 정보를 저장하는 매핑
    mapping(address => uint256) public donationTimes; // 기부자별 기부 시간 매핑

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
        // 기부자의 시간 업데이트
        donationTimes[msg.sender] = donationTime;

        // 기부자가 처음 기부한 경우, donors 배열에 추가
        if(donators[msg.sender] == msg.value){
            DonatorInfo memory d;
            d.donator = owner;
            d.donation = msg.value;
            d.donatiotime = donationTime; // 기부 시간을 기록
            donors.push(d);
        }

        _totalDonations += msg.value;

        emit DONATION(msg.sender, msg.value);
    }

    function getDonatorCount() public view returns (DonatorInfo[] memory) {
        return donors;
    }

    // 주소 & 기부자의 기부 금액 확인
    function getDonators(address donator) public view returns(uint256 result){
        require(donators[donator] > 0, 'This account did not donate');
        uint256 donation = donators[donator];
        return donation ;
    }

    // 시간 출력 
    function getDanatorTime(address donator) public view returns (uint256 result) {
        return donationTimes[donator];
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
        uint256 dnGC = donation / 10**13;
        return dnGC;
    }

    //GC 지급소
    function getGC(address donator) external view returns (uint256 result){
           require(GC[donator] > 0, "You don't have GCOIN.");
           return GC[donator];
    }

    function createItem(uint256 itemPrice) public {
       // 아이템이 생성 된 후 count값이 1 증가 -> 즉 아이템마다 고유 번호를 가지게 됌
       items[itemCount++] = Item(itemPrice, false);
    }



    // 아이템 구매 기능
    function buyItem(address donator, uint256 itemId) public {
        require(GC[donator] > 0, "You don't have GCOIN.");
    
        //itemId에 해당하는 아이템 정보를 가져옴
        Item storage item = items[itemId];

        //구매할 충분한 CG가 있는지 확인
        require(GC[donator] >= item.price, "Not enough GC to buy this item");

        //차감 함수 호출
        deductBalance(donator, item.price);

        //마킹 -> 내가 이 아이템을 구매 했는지 안했는지 구매가 성공했으면 true 아니면 false
        item.purchased = true;
        
    }

    // 차감 함수
    function deductBalance(address donator, uint256 amount) internal  {
        GC[donator] -= amount;
    }

}