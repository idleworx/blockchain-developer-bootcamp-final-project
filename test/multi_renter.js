let BN = web3.utils.BN;
const MultiRenter = artifacts.require("MultiRenter");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MultiRenter", function (accounts) {

	let instance;

	const [_owner, acct2, acct3 ] = accounts;
	const emptyAddress = "0x0000000000000000000000000000000000000000";

	beforeEach(async () => {
		instance = await MultiRenter.deployed("10000000000000000"); //or deployed?
		// instance = await MultiRenter.new("10000000000000000");
	});

	// describe("Landlords", () => {
	// 	it("initial owners should be 10", async () => {
	// 		const countLandlords = instance.landlordCount.call();
	// 		assert.equal(countLandlords.toNumber(), 10, 'Initial landlords should be 10');
	// 	});
	// });


	//contract instance with constructor
	// const accounts = await web3.eth.getAccounts();
	// const txParams = {
	//     from: accounts[0]
	// };
	// const instance = await Test.new("test", txParams);


	// await instance.setX(42 {from: acoutns[0]})
    

	it("should assert true", async function () {
		return assert.isTrue(true);
	});

	it("initial listing fee should be 0.01 ETH", async () => {
		// const instance = await MultiRenter.deployed();
		// const instance = await MultiRenter.new("10000000000000000");
		const listingFee = await instance.listingFee();
		
		//todo: check actual eth value
		//https://web3js.readthedocs.io/en/v1.2.9/web3-utils.html

		// assert.equal(new BN(listingFee.toString()), new BN(10*18), "Initial listing fee is wrong")
		// assert.equal(web3.utils.toWei(listingFee), web3.utils.toWei('12', 'ether'), "Initial listing fee is wrong")
		assert.equal(new web3.utils.BN(listingFee).toString(), new web3.utils.BN("10000000000000000").toString(), "Initial listing fee is wrong")
	
	});

	it("only the owner can change the listing fee", async () => {
		//owner account changes listing fee
		await instance.setListingFee("20000000000000000", { from: _owner } )
		
		//listinge fee is changed
		const newListingFee = await instance.listingFee.call();
		assert.equal(
			new web3.utils.BN("20000000000000000").toString(),
			new web3.utils.BN(newListingFee).toString(),
		    "New listing fee is not 20000000000000000"
		)
		
		//2nd accoutn changes listing fee
		try{
			await instance.setListingFee("50000000000000000", { from: acct2 } )	
		}
		catch(err){
			// console.log(err);
			assert(true, "Exception thrown because not the owner called it")
		}
		//listing fee is not changed
		const newListingFee2 = await instance.listingFee.call();
		assert.equal(
			new web3.utils.BN("20000000000000000").toString(),
			new web3.utils.BN(newListingFee2).toString(),
		    "New listing fee is not 20000000000000000"
		)
		
	});

	it("only a landlord can list a property", async () => {

	});
	

	it("if a landlord doesn't pay the listing fee, they can't list the property", async () => {

	});
	
	it("can only rent a property that exists", async () => {

	});

	it("owner should have at least 15 ETH", () => {
		MultiRenter.deployed()
			.then(instance => instance.getBalance.call(accounts[0]))
			.then(balance => {
				assert.greaterThan(
					balance.valueOf(),
					15,
					"Owner account doesn't have 15 ETH minimum"
				)
			});
		console.log("Blah")	
	});

	
	//const balance = await web3.eth.balance(accoutns[0])
});
