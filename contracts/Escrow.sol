pragma solidity ^0.4.23;

// import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
// import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/ownership/Ownable.sol';
import "../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Escrow is Ownable {

    using SafeMath for uint;

    mapping(address => uint) appBalance;  // map canya application to balance
    StandardToken canYaCoin;

    constructor(StandardToken _canYaCoin) public {
        canYaCoin = _canYaCoin;
    }

    function getAppBalance() public view returns (uint) {
        return appBalance[msg.sender];
    }

    /**
      * a function that allows the canya application to transfer from
      *  an address to the escrow an amount of canya coins
      */
    function transferToEscrow(address _from, uint256 _value) public returns(bool) {
        require(_value > 0);
        require(canYaCoin.approve(address(this), _value));
        require(canYaCoin.transferFrom(_from, address(this), _value));
        appBalance[msg.sender] = appBalance[msg.sender].add(_value);
        return true;
    }

    /**
      * a function that allows the escrow to transfer to an address specified by
      * the canya application an amount of canya coins
      */
    function transferFromEscrow(address _to, uint _value) public returns(bool) {
        require(_to != 0x0);
        require(_value > 0);
        require(_value <= appBalance[msg.sender]);
        require(canYaCoin.approve(address(this), _value));
        require(canYaCoin.transferFrom(address(this), _to, _value));
        appBalance[msg.sender] = appBalance[msg.sender].sub(_value);
        return true;
    }
}
