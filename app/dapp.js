console.log("MultiRenter Dapp Starting")

//replace this with local ganache address and abi for testing
//this is the rinkeby address
const contract_address = '0xe59952072d248623433aA72F5f56406bA6FebE16';
const contract_abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_listingFee",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "propertyId",
        "type": "uint256"
      }
    ],
    "name": "PropertyListed",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "landlordAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "landlords",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "listingFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "properties",
    "outputs": [
      {
        "internalType": "string",
        "name": "propertyAddress",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "rentalPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "enum MultiRenter.Status",
        "name": "status",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "propertiesCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "propertyIDs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "property_landlord",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "property_renter",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "renters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "showEarnings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_listingFee",
        "type": "uint256"
      }
    ],
    "name": "setListingFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "isLandlord",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "becomeLandlord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_propertyAddress",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_rentalPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "listRentalProperty",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getPropertiesAndLandlords",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      }
    ],
    "name": "rentProperty",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  }
];

async function getListingFee(contract){
  var listingFee = await contract.methods.listingFee().call();
  console.log("getListingFee()", listingFee);  
  return listingFee;
}

async function getCurrentEarnings(contract){
  return await contract.methods.showEarnings().call();
}

async function updateListingFee(contract, newFeeWei){
  await contract.methods.setListingFee(newFeeWei).send({from: ethereum.selectedAddress});
}  

async function becomeLandlord(contract){
  console.log("becomeLandlord() called");
  await contract.methods.becomeLandlord().send({from: ethereum.selectedAddress});
  console.log("becomeLandlord() completed");
  displayCurrentLandlord(contract);
}

async function isLandlord(contract, address){
  console.log("getLandlords() called");
  islandlord = await contract.methods.landlords(address).call();
  return islandlord;
}

async function displayCurrentLandlord(contract){
  console.log("displayCurrentLandlord() called");
  var currentLandlord = await isLandlord(contract, ethereum.selectedAddress); //is the current user/wallet a landlord?
  if(currentLandlord){
    $("#divCurrentLandlord").text(ethereum.selectedAddress + " is a landlord.")
  } else {
    $("#divCurrentLandlord").text(ethereum.selectedAddress + " is NOT a landlord.")
  }
}

async function rentProperty(contract, propertyID, rentalFee){
  await contract.methods.rentProperty(propertyID).send(
    {
      from: ethereum.selectedAddress, 
      to: contract_address, 
      value: rentalFee
    }
  );
}

async function addProperty(contract){
  console.log("addProperty() called");
  var currentListingFee = await getListingFee(contract);

  console.log("Current listing fee is: ", currentListingFee);

  var address = $("#textPropertyAddress").val();
  var rentalPeriod = $("#textRentalPeriod").val();
  var price = web3.utils.toWei($("#textPropertyPrice").val(), "ether");

  console.log(address + " | " + rentalPeriod + " | " + price);

  await contract.methods.listRentalProperty(address, rentalPeriod, price).send(
    {
      from: ethereum.selectedAddress, 
      to: contract_address, 
      value: currentListingFee
    }
  );
  
  console.log("addProperty() completed");
  // displayCurrentLandlord(contract);
}

async function getPropertiesAndLandlords(contract){
  console.log("getPropertiesAndLandlords()");  
  // await contract.methods.getPropertiesAndLandlords().call().then(console.log);
  // let propertyIDs, landlordAddresses;
  var data = await contract.methods.getPropertiesAndLandlords().call();
  // console.log(data[0]);
  // console.log(propertyIDs, landlordAddresses);
  return [data[0], data[1]];
}

async function getPropertyDetails(contract, propertyID){
  var propertyDetails = await contract.methods.properties(propertyID).call();
  return propertyDetails;
}

async function displayAllProperties(contract){
  console.log("displayAllProperties() called");
  
  let propertyIDs, landlordAddresses;
  [propertyIDs, landlordAddresses] = await getPropertiesAndLandlords(contract); 
  console.log(propertyIDs);
  console.log(landlordAddresses);

  var ulProperties = $("#ulProperties");
  ulProperties.empty(); //clear it out first

  $.each(propertyIDs, function(i){
    var li = $('<li/>')
        .addClass('list-group-item')
        .html("<p>" + 
        "Property " + propertyIDs[i] + " is owned by " + landlordAddresses[i] + 
        "&nbsp;&nbsp;<input class=\"form-control\" type=\"hidden\" id=\"textPropertyID_"+propertyIDs[i]+"\" value=\""+propertyIDs[i]+"\"/>" +
        "<button class=\"btn btn-small btn-outline-primary\" id=\"btnDetailsID_" + propertyIDs[i] + "\" name=\"btnDetails\" type=\"button\">Show Details</button>" +
        "</p>")
        .appendTo(ulProperties);
    // var aaa = $('<a/>')
    //     .addClass('ui-all')
    //     .text(countries[i])
    //     .appendTo(li);
  });
}

function handleButtons(c1){
  //add an onclick handler for rental buttons
  $('[id*="btnDetailsID_"]').click(async function(event){
    var propertyID = event.target.id.split("_")[1];
    var propertyDetails = await getPropertyDetails(c1, propertyID);
    console.log(propertyDetails);

    var status;
    if(propertyDetails['status']==0){
      status = 'Available';
    } else { 
      status = 'Rented'
    }
    
    $("#divPropertyDetails").html(
      "Property " + propertyID + " <br>Address:" + propertyDetails['propertyAddress'] + 
      "<br>Status: " + status + "<br>Rental Fee:" + web3.utils.fromWei(propertyDetails['price'],'ether') + " ETH " +
      //dynamically create a button to rent it out
      "<button class=\"btn btn-small btn-outline-primary\" id=\"btnRentID_" + propertyID + "\" name=\"btnRent\" type=\"button\">Rent It</button>"
      );

      $('[id*="btnRentID_"]').click(async function(event){
        var propertyID = event.target.id.split("_")[1];
        console.log("Renting property", propertyID);
        await rentProperty(c1, propertyID, propertyDetails['price']);
        handleButtons(c1);
      });
          
    //$("#textPropertyID_"+propertyID).val()
});
}

async function startApp(){

    // document.getElementById('mm-connect').onclick = async function(){ // = () => {}
    //   console.log("Connecting to metamask wallet ...");
    //   await ethereum.request({ method: 'eth_requestAccounts' });
    // };
    
    const c1 = new web3.eth.Contract(contract_abi, contract_address);
    c1.setProvider(window.ethereum); 

    // $("#mm-connect").click(async function(){
    //   console.log("Connecting to metamask wallet ...");
    //   await ethereum.request({ method: 'eth_requestAccounts' });
    //   $("#mm-current-account").text("Connected to: " + ethereum.selectedAddress);
    // });
    
    console.log("Connecting to metamask wallet ...");
    await ethereum.request({ method: 'eth_requestAccounts' });
    $("#mm-current-account").text("Connected to: " + ethereum.selectedAddress);

    $("#updateListingFeeForm").submit(async function(event){
      event.preventDefault();
      var newListingFee = web3.utils.toWei($("#updateListingFeeValue").val(), "ether");
      if(newListingFee <= 0){
        alert("Please enter a valid listing fee > 0 wei");
        return;
      }

      console.log("Updating listing fee to:" + newListingFee);
      await updateListingFee(c1, newListingFee);
      $("#listingFeeLbl").text(web3.utils.fromWei(newListingFee,"ether"));
      $("#textListingFee").val(web3.utils.fromWei(newListingFee,"ether"));

    });

    $("#btnBecomeLandlord").click(async function(){
      await becomeLandlord(c1);
    });

    $("#frmAddProperty").submit(async function(event){
      event.preventDefault();
      await addProperty(c1);
      await displayAllProperties(c1);
      handleButtons(c1); 
    });

    //display listing fee on initial load (read contract state)
    var currentListingFee = await getListingFee(c1);
    $("#listingFeeLbl").text(web3.utils.fromWei(currentListingFee,"ether"));
    $("#textListingFee").val(web3.utils.fromWei(currentListingFee,"ether"));
    
    var currentEarnings = await getCurrentEarnings(c1);
    console.log("current earnings", currentEarnings);
    $("#lblEarnings").text(web3.utils.fromWei(currentEarnings),"ether");

    await displayCurrentLandlord(c1);

    //display all properties and who owns them
    await displayAllProperties(c1);

    handleButtons(c1);

    



    // var web3 = new Web3(window.ethereum);

    // const c1 = new web3.eth.Contract(contract_abi, contract_address);
    // // // console.log(web3);
    // // // console.log(c1);
    // c1.setProvider(window.ethereum); 

//     document.getElementById('getValue').onclick = async ()=> {
//         await simpleStorageContract.methods.get().call().then(console.log);
//     }

//     const mmEnable = document.getElementById('mm-connect');

//     mmEnable.onclick = async () => {
//         await ethereum.request(
//             {method: 'etawait simpleStorageContract.methods.get().call().then(console.log);h_requestAccounts'}
//         )
//         const mmCurrentAccount = document.getElementById('mm-current-account');
//         mmCurrentAccount.innerHTML += ethereum.selectedAddress;
//     }

//     const mmSubmit = document.getElementById('ss-input-button');
//     mmSubmit.onclick = async () => {
//          const inputBox = document.getElementById('ss-input-box');
//          console.log(inputBox.value);

// //         var web3 = new Web3(window.ethereum);
// //         const simpleStorageContract = new web3.eth.Contract(contract_abi, contract_address);
// //         simpleStorageContract.setProvider(window.ethereum); //metamask

// //         await simpleStorageContract.methods.set(inputBox.value).call(); old version
//          await simpleStorageContract.methods.set(inputBox.value).send({from: ethereum.selectedAddress})
        // }
}

var web3;
$( document ).ready(function() {

    if (typeof window.ethereum !== 'undefined') {
        console.log("Metamask detected");
        $("#mm-detected").text("Metamask detected");
        web3 = new Web3(window.ethereum);
        startApp();
      }
    else {
        console.error("Metamask not available")
        $("#mm-detected").text("Metamask not available");
    }

});