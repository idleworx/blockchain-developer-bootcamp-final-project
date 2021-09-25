# blockchain-developer-bootcamp-final-project

## Project Description

**Name: Sequential Rentals**

The project will allow appartment owners to list an appartment for rent, and one or more people to rent it sequentially during a specified period of time (say 1 month) without overlapping eachother. All done without human interaction on the blockchain

To enter the appartment, the renter has to make a smart contract transaction: enter() which will determine if he's allowed to enter at any specific time. 
Example: 
- the door has a bluetooth enabled smart lock
- renter scans their phone to unlock the door
- the dapp on their phone sends an enter() transaction which detemrines if they are allowed to enter the unit
- if the enter() transaction return true -> the door is unlocked

This is similar to how a timeshare would work, with the assumption that the real world appartment (or unit) has a blockchain enabled smart contract or app that determines if a renter has access to it and a bluetooth enabled smart lock that unlocks the unit, instead of a physical key, which would be outside the scope of this project. 



## How it will work

- An **Owner** can list a unit for rent by specifying the following
-- length of time to rent it (30 days)
-- the amount of rent required to rent it (in ETH)
-- the maximum amount of renters allowed within the period of time 
- Example: Unit A is available for rent from Jan 1 - Jan 30 (**rental period**) to up to 4 people, and the rent costs 1 ETH.
- A **Renter** can commit to renting the unit by getting in the rental queue and commiting rent in ETH
- 
   
**Notes**
- The owner can specify a minimum amount of renters required and the max allowed. 
- The rental period starts when there are enough renters, and they have commited the funds
- The rental period ends when the initial rent time expires (example): block.timestamp + 1 month
  
**Limitations** 
- Renters can't overlap with eachother, they rent sequentially (renter 1 gets day 1, renter 2 gets day 2, etc) 
- Renters are allowed to enter the unit when their rental day is current, meaning the door unlocks for them. 
  Since it's not feasible to track when a renter leaves the property, in case the previous renter is still in the unit they will bump into eachother -> this is left to the real world humans to decide how to handle. eg: "Oh I'm sorry John, didn't realize you are still here. Can you get out now" "Sure Billy, I guess I overslept. Bye"  
