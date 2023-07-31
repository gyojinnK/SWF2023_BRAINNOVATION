const Test = artifacts.require("test");
const { assert } = require("chai");
const truffleAssert = require('truffle-assertions');
const testDonation = 10 ** 15;


contract("test", function([deployer, user1, user2]) {
    let test;

    //beforeEach를 사용해서 스마트 컨트랙트 인스턴스를 생성
    beforeEach(async () => {
        test = await Test.new();
      });

      it.only('should allow users to donate ether', async() =>{
          console.log(await test.donate({from: user2, value: testDonation}));
          let totalD = await test.getTotalDonations();
        console.log(`Total: ${totalD}`);
      });

      it('accounts Check', async() =>{
        let accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
      })

      /**
       * @dev 기부를 한 후에 기부자의 잔액이 올바르게 차감 되었는지 확인
       * 
       */
    //   const finalBalance = await web3.eth.getBalance(accounts[0]);
    //   assert(finalBalance < initialBalance, 'Donation was not successful');

    it('should allow users to customize characters', async () =>{
        //기부를 먼저 수행
        const donationAmount = web3.utils.toWei('2' , 'ether');
        await donationAndCustomization.donate({ from: accounts[0], value: donationAmount});

        const name = 'gksdydwns';
        const clothes = 10;
        const accessory= 10;

        //캐릭터 커스터마이징 함수 호출
        const receipt = await donationAndCustomization.customizeCharacter(
            name,
            clothes,
            accessory,
            {from: accounts[0]}
        );

         // 검증: 컨트랙트에서 발생한 이벤트 확인
        assert.equal(receipt.events.donationAndCustomization.returnValues._by, accounts[0], "Customization by the correct user");
    });
});
