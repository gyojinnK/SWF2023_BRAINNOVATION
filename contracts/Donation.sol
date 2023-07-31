// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationAndCustomization {
    // 기부 이벤트 선언
    event DonationReceived(address indexed donor, uint256 amount);


    // 캐릭터 커스터마이징 함수를 호출할 때 발생하는 이벤트를 선언합니다.
    event CharacterCustomized(address indexed owner, string characterName, uint256 strength, uint256 agility, uint256 intelligence);

    // 기부자를 저장하기 위한 배열 선언
    address[] public donors;

    // 기부자의 기부금을 저장하기 위한 매핑 선언
    mapping(address => uint256) public donations;

    //캐릭터 정보를 저장하기 위한 구조체를 정의
    struct Character {
        string name;
        uint256 clothes;
        uint256 accessory;
        
    }

    // 매핑을 사용해서 각 주소에 해당하는 캐릭터 정보를 저장.
    mapping(address => Character) public characters;

    //기부를 처리하는 함수를 정의
    function donate() public payable {
        // 기부자가 0 이상의 이더를 기부해야 함.
        require(msg.value > 0 , "You must send some ether to donate");
    }
}