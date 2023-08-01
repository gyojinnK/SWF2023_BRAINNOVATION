const Donation = artifacts.require("donation");
const { assert } = require("chai");
const truffleAssert = require('truffle-assertions');
const testDonation = 10 ** 14;


contract("donation", function([deployer, user1, user2, user3]) {
    let donation;

    //beforeEach를 사용해서 스마트 컨트랙트 인스턴스를 생성
    beforeEach(async () => {
        donation = await Donation.new();
      });

    describe.only('Donate', () => {
        it('should allow users to donate ether', async() =>{
            console.log(await donation.donate({from: user1, value: testDonation}));
            console.log(await donation.donate({from: user2, value: testDonation}));
            console.log(await donation.donate({from: user3, value: testDonation}));
            let totalD = await donation.getTotalDonations();
            console.log(`Total: ${totalD}`);
            console.log('================');
            console.log(user2);
            let donation = await donation.getDonators(user1);
            let donatime = await donation.getDanatorTime(user1);
            console.log(donation.toString());
            // time을 Date 객체로 변환
            let donationDate = new Date(donatime * 1000); // 자바스크립트에서 Date 객체는 밀리초 단위이므로 1000을 곱해야 함.

            let formattedDate = `${donationDate.getFullYear()}-${
                donationDate.getMonth() + 1}-${donationDate.getDate()} ${
                donationDate.getHours()}:${donationDate.getMinutes()}:${donationDate.getSeconds()}`;

            console.log(`time : ${formattedDate}`);

            //Donors 배열 길이 구하기
            let Dolen = await donation.getDonors();
            console.log(`length: ${Dolen}`);

            // 토큰 지급
            await donation.createGC(user1);
            let giveGC = await donation.getGC(user1);
            console.log(`GC: ${giveGC}`)

            // 50 금액 임의로 지급
            await donation.createItem(5);

            let buyItem_user1 = await donation.buyItem(user1,0);

            const purchased_item = await donation.items(0); 
            console.log(`Item Price: ${purchased_item.price}, Purchased: ${purchased_item.purchased}`);

            //구매 후 잔액 조회
            const balanceOfUser1 = await donation.GC(user1);
            console.log(`Balance of user1 after purchase: ${balanceOfUser1}`);
        
    });

    it.only('Donate and display all donator information', async () => {

        await donation.donate({from: user1, value: testDonation})
        await donation.donate({from: user2, value: testDonation})
        await donation.donate({from: user3, value: testDonation})
        

        const allDonators = await donation.getDonatorCount();
    
        allDonators.forEach((donatorInfo, index) =>{
            console.log(`Donator: ${index + 1}`);
            console.log(`Address: ${donatorInfo.donation}`);
            const donationDate = new Date(donatorInfo.donatiotime * 1000);
            let formattedDate = `${donationDate.getFullYear()}-${
                donationDate.getMonth() + 1}-${donationDate.getDate()} ${
                donationDate.getHours()}:${donationDate.getMinutes()}:${donationDate.getSeconds()}`;

            console.log(`time : ${formattedDate}`);
            
        }) 
    });
  
})
     

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
