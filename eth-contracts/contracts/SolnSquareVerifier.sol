pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './ERC721Mintable.sol';
import '.Verifier.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token{
Verifier verifier;
constructor{address verifieraddress} public{
    verifier=verifier(verifieraddress);
}

// TODO define a solutions struct that can hold an index & an address
struct solution{
    uint tokenID;
    address owner;
}

// TODO define an array of the above struct
solution[] private solutions

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => bool) private submittedsolution


// TODO Create an event to emit when a solution is added
event addingsolution(address _address);



// TODO Create a function to add the solutions to the array and emit the event
function addsolution(address _address, bytes key) public{
    solution memory newsolution = solution(_address);
    solutions.push(newsolution);
    submittedsolution[key]=true;
    emit addingsolution(_address);
}

modifier verifysolution(uint[2] memory a, uint[2] memory b, uint memory c, uint[2] memory input){
    require(verifier.verifyTx(a,b,c,input)," Solution is not valid");
    _;
}

function mint (address to, uint tokenid, uint[2] memory a, uint[2] memory b, uint memory c, uint[2] memory input)
verifysolution(a,b,c,input)
returns(bool)
{
    bytes32 key=keccak256(abi.encodePacked(a,b,c,input));
    require(submittedsolution[key]==false,"solution is not unique");
    addsolution(tokenid,to,key);
    return mint(to,tokenid);
}
// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  


























