// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MultiRenter Smart Contract Consensys Final Project
/// @author idleworx
/// @notice This is a property marketplace rental simulator using the blockchain
contract MultiRenter is Ownable{

    // **************** variables *********************************************
    
    uint public propertiesCount; //total properties listed and serves as current property ID when adding a new one
   
    mapping (address => bool) public landlords; //landlord wallet address -> landlord id 
    mapping (address => bool) public renters;   //renter wallet address -> renter id
   
    mapping (uint => RentalProperty) public properties; //property id -> rental details
    
    uint[]      public propertyIDs;            // list of all property IDs (for UI rendering)
    address[]   public landlordAddresses;   // list of all landlord IDs (for UI rendering)
    
    mapping (uint => address) public property_landlord;      //tracks property ID -> landlord address
    mapping (uint => address) public property_renter;        //tracks property ID -> renter address
    
    // address owner; //contract owner
    
    uint public listingFee = 10000000000000000; //in wei (0.01 ETH) 
    
    enum Status {
        Available,
        Rented
    }
    
    struct RentalProperty {
        string propertyAddress; //real world address
        uint rentalPeriod; //how long it will be rented for (not currently implemented)
        uint price;  //rental price in wei
        Status status; //Available or Rented
    }
  
    event PropertyListed(uint propertyId);
    
    /// @notice Deploy contract. 
    /// @param _listingFee - Number in wei that will represent the fee someone has to pay to list a property. 
    constructor(uint _listingFee){
        // owner = msg.sender;
        listingFee = _listingFee;  //set default listing fee to list a single property
    }

    // /// @notice Ensures only the contract owner can call a function
    // modifier onlyOwner{
    //     require(msg.sender == owner, "Only the contract owner can call this method!"); 
    //     _; 
    // }
    
    /// @notice Ensures only a registered landlord can call a function
    modifier onlyLandlord{
        require(landlords[msg.sender]==true,"Only a landlord can call this method");
        _;
    }
    
    /// @notice Ensures a property exists, by minimally checking it has a physical address 
    /// @param _propertyID the unique property id like 0, 20, or 234
    modifier propertyExists(uint _propertyID){
        bytes memory propertyAddress = bytes(properties[_propertyID].propertyAddress); 
        require(propertyAddress.length > 0, "This property doesn't exist");
        _;
    }
    
    /// @notice Ensures the sender has sent enough ether with the transaction to rent a property
    /// @dev _propertyID the unique property id
    modifier paidEnoughRentalFee(uint _propertyID) {
        require(msg.value >= properties[_propertyID].price, "You must pay the rental fee"); //TODO: FUTURE: we should be nice and refund overpayment here to the renter
        _;
    }
    
    /// @notice Ensures a property is not already rented by someone else 
    /// @param _propertyID unique property id
    modifier isNotRented(uint _propertyID){
        require(properties[_propertyID].status==Status.Available, "Property must not be already rented");
        _;
    }
    
    /// @notice Ensures the listing fee has been paid
    modifier paidEnoughFee() { 
        require(msg.value >= listingFee, "You must pay the listing fee"); //TODO: FUTURE: we should be nice and refund overpayment here to the landlord
        _;
    }
    
    // ------------------------ functions ------------------------
    
    /// @notice Shows the current earnings of this contract (all fees paid to it for listing and renting)
    /// @return Balance of this contract in wei
    function showEarnings() public view returns(uint){
        return address(this).balance;    
    }
    
    /// @notice Sets the default listing fee. Only the contract owner can modify this. 
    /// @param _listingFee property listing fee in wei
    /// @return current listing fee
    function setListingFee(uint _listingFee) public onlyOwner returns(uint){
        //only owner can change this fee
        listingFee = _listingFee;
        return listingFee;
    }
    
    /// @notice Checks if an address is a landlord. Only landlords can list new properties for rent.
    /// @dev not really needed since we have the landlords public variable. just a convenience method
    /// @param _addr wallet address
    /// @return true/false if the address is a landlord
    function isLandlord(address _addr) public view returns (bool) {
        return landlords[_addr];
    }

    
    /// @notice Registers transaction sender as a landlord
    function becomeLandlord() public {
        landlords[msg.sender]=true;
    }
        
    
    /// @notice Lists a new property on the marketplace. Only landlords can list new properties for rent.
    /// @dev not really needed since we have the landlords public variable. just a convenience method
    /// @param _propertyAddress The real world property address: 14th North St, Ft Lauderdale, FL 20991
    /// @param _rentalPeriod For how long (in days) this property can be rented: Ex: 30 
    /// @param _price The rental price (in wei) of this property. 
    /// @dev The _rentalPeriod is not implemented, didn't have time. Ideally this would hook into chainlink or some other way (other than a block count) to determine when the rental period expires. 
    /// @return the ID of the newly listed property
    function listRentalProperty(string memory _propertyAddress, uint _rentalPeriod, uint _price) public payable onlyLandlord paidEnoughFee returns (uint){
        
        properties[propertiesCount] = RentalProperty({ //create new property and give it an id
            propertyAddress: _propertyAddress,
            rentalPeriod: _rentalPeriod,
            price: _price,
            status: Status.Available
        });
        
        property_landlord[propertiesCount] = msg.sender; //track property id owned by an address
        
        propertyIDs.push(propertiesCount); //keep a list of all property ids
        landlordAddresses.push(msg.sender);//keep a list of all landlords 
        
        emit PropertyListed(propertiesCount);
         
        propertiesCount = propertiesCount + 1;
        
        return propertiesCount;
    }
    
    /// @notice Returns 2 lists of the same size containing all property ids and all landlords who own them
    /// @dev This is used to be able to render all properties in the Dapp's UI
    /// @return 2 uint[] lists containing the property ids and landlord addresses that own them
    function getPropertiesAndLandlords() public view returns (uint[] memory, address[] memory){
        return (propertyIDs, landlordAddresses);
    }
    
    /// @notice Allows someonea to rent the property by paying the rental fee. Only proeprties that are not already Rented can be rented.
    /// @param _propertyId the unique property id to rent
    /// @dev for now we allow the owner to also rent his own property. maybe they like spending money on gas fees? 
    function rentProperty(uint _propertyId) public payable propertyExists(_propertyId) isNotRented(_propertyId) paidEnoughRentalFee(_propertyId){
        renters[msg.sender]=true;
        property_renter[_propertyId] = msg.sender;    
        properties[_propertyId].status = Status.Rented;
    }
    
}