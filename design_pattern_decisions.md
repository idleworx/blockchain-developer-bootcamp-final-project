The MultiRenter smart contract uses the following 2 design patterns

**Inheritance and Interfaces (Importing and extending contracts and/or using contract interfaces)**

The contract inherits from the OpenZeppelin Ownable contract 
which gives it additional functionality like ```transferOwnership``` and ```renounceOwnership```

```contract MultiRenter is Ownable ...```

**Access Control Design Patterns (Restricting access to certain functions using things like Ownable, Role-based Control)**

The MultiRenter restricts access to only the contract owner for the following methods:

```
 function setListingFee(uint _listingFee) public onlyOwner returns(uint){
        //only owner can change this fee
        listingFee = _listingFee;
        return listingFee;
    }
```

This allows only the contract owner to change the default listing fee. The listing fee is the fee that a landlord needs to pay to the contract to list a property.
