// DonationAndCustomization 스마트 컨트랙트를 가져옴
const DonationAndCustomization = artifacts.require("DonationAndCustomization");
const { assert } = require("chai");
const truffleAssert = require('truffle-assertions');


contract("DonationAndCustomization", accounts => {
    let donationAndCustomization;

    //beforeEach를 사용해서 스마트 컨트랙트 인스턴스를 생성
    beforeEach(async () => {
        donationAndCustomization = await DonationAndCustomization.new();
      });

      it('should allow users to donate ether', async() =>{
        const amount = web3.utils.toWei('1', 'ether');
        const initialBalance = await web3.eth.getBalance(accounts[0]);

        // 기부 함수를 호출.
        const receipt = await donationAndCustomization.donate({ from: accounts[0], value: amount });

        // 기부 이벤트를 확인.
        truffleAssert.eventEmitted(receipt, 'DonationReceived', event => {
        return event.donor === accounts[0] && event.amount.toString() === amount
      });

      /**
       * @dev 기부를 한 후에 기부자의 잔액이 올바르게 차감 되었는지 확인
       * 
       */
      const finalBalance = await web3.eth.getBalance(accounts[0]);
      assert(finalBalance < initialBalance, 'Donation was not successful');
    });

    it('should allow users to customize characters', async () =>{
        //기부를 먼저 수행
        const donationAmount = web3.utils.toWei('2' , 'ether');
        await donationAndCustomization.donate({ from: accounts[0], value: donationAmount});

        const characterName = 'gksdydwns';
        const clothes = 10;
        const accessory= 10;

        //캐릭터 커스터마이징 함수 호출
        const receipt = await donationAndCustomization.customizeCharacter(
            characterName,
            clothes,
            accessory,
            {from: accounts[0]}
        );
    })
});