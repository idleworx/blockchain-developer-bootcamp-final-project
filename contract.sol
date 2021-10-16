// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

contract FinalProject {
    
    mapping (uint => address) public landlords; //landlord_id -> adddress
    mapping (uint => address) public renters;   //renter_id -> address
    
    mapping (uint => uint) unit_landlords; //unit_id -> landlord_id 
    mapping (uint => uint) unit_renters;   //unit_id -> renter_id
    
    
    //https://medium.com/coinmonks/solidity-fundamentals-e4e4660e16c8
    
    struct Landlord {
        uint id;
        address renter;
    }
    
    struct Renter {
        uint id;
        address renter;
    }
    
    //when the rental period is finished, 
    //owner must create a new rental unit    
    struct RentalUnit {
        uint id;
        uint rentalPeriod; //how long it will be rented for
        uint price;  //rental price in ETH
        uint8 minRenters; //min nr of renters required to rent out this rental unit (can't be < 1)
        // bool rentalPeriodFinished;
        
    }
    
    //landlord operations
    
    function addLandlord() public {
        //add msg.sender as a registered landlord
    }

    function addUnit() public isLandlord {
        //a landlord can add a rental unit
    }
    
    function removeUnit() public isLandlord {
        //a landlord can remove a rental unit
        //only if it's not listed for rent (active listing) or (being rented out)
    }
    
    function listUnit(uint unitID, uint rentalPeriod, uint price, uint8 minRenters) public isLandlord {
        //a landlord can list a unit 
        //only their own listing
    }
    
    function unlistUnit() public isLandlord {
        //a landlord can unlist their unit
    }
    
    //renter operations
    
    function registerRenter() public {
        //register as a prospective renter for a specific property
        //property must exist, must be listed for rent, must not have started the rental period
    }
    
    function access(uint unitID) public {
        //checks if a renter can access a unit
        //checks:
        //renter must be approved for this property and have paid for it
        //unit rental time must have started
        //unit rental time must not have ended
        //msg.sender (renter's) access - mut be his turn (eg. day 1,3,5 etc)  
    }    
    
    
}