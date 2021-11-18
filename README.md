# blockchain-developer-bootcamp-final-project

## Project Description

**Name: MultiRental**

The project simulates a property rental/buyer marketplace.

The project will allow anyone with an ethereum wallet to list an property for rent for a specified rental price. And a renter to pay for and rent available properties.


The following transactions will be implemented:

- anyone can become a 'landlord' (only gas fee)
- a 'landlord' can list a property for rent    (gas fee + listing fee)
- a 'renter' can rent a property that is listed (and unrented) (gas fee + rental price)
- a renter can call the 'enter()' method on a property (they have rented) that would simulate unlocking the front door. 

The property has 4 attributes
```
struct RentalProperty {
        string propertyAddress; //real world address
        uint rentalPeriod; //how long it will be rented for
        uint price;  //rental price in wei
        Status status; //Available or Rented
    }
```

Context

In the real world once a property is rented it would have a bluetoot enabled smart lock with blockchain integration that would work like this:

- the door has a bluetooth enabled smart lock
- renter scans their phone to unlock the door
- the dapp on their phone sends an enter() transaction to the MultiRenter smart contract, which detemrines if they are allowed to enter the unit
- if the enter() transaction return true -> the door is unlocked



Note: Initially I had more ambitious goals to allow multiple people to rent the property at the same time (without overlapping on alternate days) but due to time constraints realized this would take me a lot longer to implement. 

The idea was similar to how a timeshare would work, with the assumption that the real world appartment (or unit) has a blockchain enabled smart contract or app that determines if a renter has access to it and a bluetooth enabled smart lock that unlocks the unit, instead of a physical key (the implementation of which would be outside the scope of this project).

I trimmed down the project to the above functionality, which allows a landlord to list one or more properties and only one renter to rent a property at any time.




## How it will work

- A **Landlord** can list a unit for rent by specifying the following
-- length of time to rent it (30 days)
-- the amount of eth required to rent it (in ETH)
- A **Renter** can commit to renting the unit by paying the rental fee
  

