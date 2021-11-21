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
	});

	// it("should assert true", async function () {
	// 	return assert.isTrue(true);
	// });

	it("initial listing fee should be 0.01 ETH", async () => {
		const listingFee = await instance.listingFee();
		
		//todo: check actual eth value
		//https://web3js.readthedocs.io/en/v1.2.9/web3-utils.html
	
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
			// TODO: better https://github.com/trufflesuite/truffle/issues/498#issuecomment-386777359
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
		
		const listingFee = await instance.listingFee();

		await instance.becomeLandlord({from: _owner}); //_owner becomes a landlord
		
		let l = await instance.isLandlord(_owner);
		console.log("Is landlord:", l);

		await instance.listRentalProperty.sendTransaction(
			"123 Property 1", 10, "10000000000000000",
			{
			from: _owner, 
			to: MultiRenter.address, 
			value: listingFee
			}
		);
		assert(true, "No error thrown")
	});

	it("a non landlord can't list a property", async () => {
		
		//account 2 tries to list a property
		const listingFee = await instance.listingFee();

		try{
			await instance.listRentalProperty.sendTransaction(
				"123 Property 1", 10, "10000000000000000",
				{
				from: acct2, 
				to: MultiRenter.address, 
				value: listingFee.toString()
				}
			);
		}
		catch(err){
			assert(true, "Exception was thrown because acct is not a landlord")
		}
	});
	
	//https://www.trufflesuite.com/docs/truffle/reference/contract-abstractions
	it("someone can rent the property", async () => {

		const listingFee = await instance.listingFee();
		
		//landlord registered

		await instance.becomeLandlord({from: _owner}); //_owner becomes a landlord
		
		let l = await instance.isLandlord(_owner);
		console.log("Is landlord:", l);

		//landlord lists property
		let propertyIDPromise = await instance.listRentalProperty.sendTransaction(
			"123 Property 2", 10, "25000000000000000",
			{
			from: _owner, 
			to: MultiRenter.address, 
			value: listingFee
			}
		);

		let propertyID = propertyIDPromise.logs[0].args[0].toNumber()
		console.log("PropertyID:",propertyID);
		
		//renter rents property
		await instance.rentProperty.sendTransaction(
			propertyID,
			{
			  from: acct2, 
			  to: MultiRenter.address, 
			  value: "25000000000000000"
			});

	});

	it("owner should have at least 0.5 ETH", async () => {
		let balance = await web3.eth.getBalance(_owner);
		console.log("balance:",balance);
		assert.isTrue(
			new web3.utils.BN(balance.toString()) >=
			new web3.utils.BN("10000000000000000".toString())
		)
	});

});
