# MultiRenter

Front End available at: https://idleworx.github.io/blockchain-developer-bootcamp-final-project/

## Project Structure

Project is built with Truffle, and has the standard folders:

```
index.html - frontend ui
app - js file for the frontend (built with jQuery + Web3.js)
contracts - MultiRenter.sol is the main contract
migrations - truffle migration js files
test - truffle tests
```

The UI is built with jQuery and Boostrap. Why jQuery? Because I haven't worked with React yet, and it's been a while since I did Angular and VueJS (my prefered spa framework). Also because I hate webpack with a passion. So I went old school.

## Project Description

**MultiRenter**

The project simulates a property rental/buyer marketplace.

The project will allow anyone with an ethereum wallet to list a real wold property for rent for a specified rental price. Anyone can then rent the propety by paying a fee.

The following functions are be implemented:

- becomeLandlord() - anyone can become a 'landlord' (gas fee only)
- listRentalProperty() - a 'landlord' can list a property for rent (gas fee + listing fee)
- rentProperty() - a 'renter' can rent a property that is listed (and unrented) (gas fee + rental price)

The property has 4 attributes
```
struct RentalProperty {
        string propertyAddress; //real world address
        uint rentalPeriod; //how long it will be rented for
        uint price;  //rental price in wei
        Status status; //Available or Rented
    }
```


**Additional Info**

In the real world once a property is rented it would have a bluetooth enabled smart lock with blockchain integration that would allow a renter to open the door.

**Note**: Initially I had more ambitious goals to allow multiple renters to rent the property at the same time (without overlapping, on alternate days) but due to time constraints realized this would take me a lot longer to implement, as it would require Oracles and a 3rd party (off-blockchain) service for additional functionality.

The idea however was similar to how a timeshare would work, with the assumption that the real world appartment (or unit) has a blockchain enabled smart contract or app that determines if a renter has access to it and a bluetooth enabled smart lock that unlocks the unit, instead of a physical key (the implementation of which would be outside the scope of this project).

I trimmed down the project to the above functionality, which allows a landlord to list one or more properties and only one renter to rent a property at any time with some limitations built in.

As a result, I didn't end up implementing the ```enter()``` function which would have handled the determination of which renter, out of multiple renters within a 30 day period, would be allow to enter 'today' for example.


## How it works

- User is prompted to connect with Metamask

- A **Landlord** can list a unit for rent by specifying the following
 - the physical world address
 - length of time to rent it (30 days)
 - the amount of eth required to rent it (in ETH)

- A **Renter** can rent the property by paying the rental fee (as long as it's not already rented)
  
**Limitations**
- only a landlord can list a property for rent (you must become one before listing a property)
- a landlord has to pay a listing fee to list a property
- a renter can rent a property by paying the rental fee
- a renter can't rent a previously rented property
- a property must exist to be rented  

## How to Run Locally

- git clone
- ```npm install```
- create new ganache project using truffle-config.js file OR
  spin up ganache on port: 8545
- run: 'truffle test' to run the tests
- run: 'truffle compile' then 'truffle migrate' on the develop network
- copy the contract address and abi into the app/dapp.js file variables
- run the app/index.html file on localhost as needed

## Ethereum Address for Certification

0xe7808B9eC2Bc8DdfF3045F0691391536276697fd