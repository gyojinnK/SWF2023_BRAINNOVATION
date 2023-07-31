// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DonationAndCustomization {
    // 기부 이벤트 선언
    event DonationReceived(address indexed donor, uint256 amount);

    // 캐릭터 커스터마이징 함수를 호출할 때 발생하는 이벤트를 선언합니다.
    event CharacterCustomized(address indexed owner, string name, uint256 clothes, uint accessory);

    // ERC-20 토큰의 Transfer 이벤트를 선언합니다.
    event Transfer(address indexed from, address indexed to, uint256 value);

    // ERC-20 토큰의 Approval 이벤트를 선언합니다.
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // 기부자를 저장하기 위한 배열 선언
    address[] public donors;

    // 기부자의 기부금을 저장하기 위한 매핑 선언
    mapping(address => uint256) public donations;

    //토큰의 승인 전송을 위한 매핑
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

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

        // 기부자의 기부금을 업데이트
        donations[msg.sender] += msg.value;

        // 기부자가 처음 기부한 경우, donors 배열에 추가
        if(donations[msg.sender] == msg.value) {
            donors.push(msg.sender);
        }

        //기부 이벤트 발생
        emit DonationReceived(msg.sender, msg.value);
    }

    // 캐릭터를 커스터마이징하는 함수 정의
    function customizeCharacter (
        string memory name,
        uint256 clothes,
        uint256 accessory
        
    ) public {
        // 기부자의 기부금이 커스터마이징 비용울 충분히 충당하는지 검증
        require(donations[msg.sender] >= computeCustomizationCost(clothes, accessory), "Insufficient donation to customize your character.");

        //캐릭터 정보 업데이트
        characters[msg.sender] =Character(name, clothes, accessory);

        // 커스터마이징 이후 기부금을 초기화
        donations[msg.sender] -= computeCustomizationCost(clothes, accessory);

        // 캐릭터 커스터마이징 이벤트를 발생시킴
         emit CharacterCustomized(msg.sender, name, clothes, accessory);
    }

    // 캐릭터 커스터마이징 비용을 계산하는 함수를 정의합니다.
    function computeCustomizationCost(
        uint256 clothes,
        uint256 accessory
    ) internal pure returns (uint256) {
        
        return clothes * 1 ether +  accessory * 1 ether;
    }

    // ERC-20 토큰의 승인 기능을 구현합니다.
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // ERC-20 토큰의 전송 기능을 확장하여 토큰 전송 시 기부금을 기부자에게 추가로 지급
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_to != address(0), "Invalid address");
        require(balanceOf[_from] >= _value, "Insufficient balance");
        require(allowance[_from][msg.sender] >= _value, "Not allowed to spend this amount");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        // 기부자에게 추가로 지급
        donations[_from] += _value;

        emit Transfer(_from, _to, _value);
        return true;
    }
}