pragma solidity ^0.4.23;

// import 'github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import "../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract CanYaCoin is StandardToken {
    string public constant name = "CanYaCoin"; // solium-disable-line uppercase
    string public constant symbol = "CAN"; // solium-disable-line uppercase
    uint8 public constant decimals = 8; // solium-disable-line uppercase
    uint256 public constant buyPrice = 100000000; // price in wei
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

    constructor() public
    {
        totalSupply_ = INITIAL_SUPPLY;
        balances[this] = INITIAL_SUPPLY;
        emit Transfer(0x0, msg.sender, INITIAL_SUPPLY);
    }

    function buy()
        public payable returns (uint _amount)
    {
        _amount = msg.value / buyPrice;
        require(balances[this] >= _amount);
        balances[msg.sender] += _amount;
        balances[this] -= _amount;
        emit Transfer(this, msg.sender, _amount);

        return _amount;
    }

}
