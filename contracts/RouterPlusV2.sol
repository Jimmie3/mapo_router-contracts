// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@butternetwork/bridge/contracts/interface/IButterBridgeV3.sol";
import "@butternetwork/bridge/contracts/interface/IButterReceiver.sol";
import "./abstract/SwapCall.sol";
import "./interface/IRouterPlus.sol";

contract RouterPlusV2 is SwapCall, ReentrancyGuard, Ownable2Step, IButterReceiver, IRouterPlus {
    using SafeERC20 for IERC20;
    using Address for address;

    uint256 private constant FEE_DENOMINATOR = 1000000;
    address private constant TW_REFERRER = 0x4A53841B9b16182f996a65aAb407e7622CBCf966;

    address public bridgeAddress;
    uint256 public gasForReFund = 80000;
    address public feeReceiver;
    uint256 public feeRate;

    // use to solve deep stack
    struct SwapTemp {
        address srcToken;
        address swapToken;
        uint256 srcAmount;
        uint256 swapAmount;
        bytes32 transferId;
        address initiator;
        address receiver;
        address target;
        uint256 callAmount;
        uint256 fromChain;
        uint256 toChain;
        uint256 nativeBalance;
        uint256 inputBalance;
        bytes from;
    }
    event CollectFee(bytes32 transferId, bytes32 orderId, address indexed token, uint256 feeAmount, bool feeBeforeSwap);
    event SetFee(address indexed _receiver, uint256 _feeRate);
    event SetGasForReFund(uint256 _gasForReFund);
    event SetBridgeAddress(address indexed _bridgeAddress);
    event Approve(address indexed executor, bool indexed flag);

    constructor(address _bridgeAddress, address _owner, address _wToken) payable SwapCall(_wToken) {
        if (_owner == address(0)) revert Errors.ZERO_ADDRESS();
        _transferOwnership(_owner);
        _setBridgeAddress(_bridgeAddress);
    }

    function setAuthorization(address[] calldata _executors, bool _flag) external onlyOwner {
        if (_executors.length == 0) revert Errors.EMPTY();
        for (uint i = 0; i < _executors.length; i++) {
            if (!_executors[i].isContract()) revert Errors.NOT_CONTRACT();
            approved[_executors[i]] = _flag;
            emit Approve(_executors[i], _flag);
        }
    }

    function setGasForReFund(uint256 _gasForReFund) external onlyOwner {
        gasForReFund = _gasForReFund;
        emit SetGasForReFund(_gasForReFund);
    }

    function setBridgeAddress(address _bridgeAddress) public onlyOwner returns (bool) {
        _setBridgeAddress(_bridgeAddress);
        return true;
    }

    function setWToken(address _wToken) external onlyOwner {
        _setWToken(_wToken);
    }

    function editFuncBlackList(bytes4 _func, bool _flag) external onlyOwner {
        _editFuncBlackList(_func, _flag);
    }

    function setFee(address _receiver, uint256 _feeRate) external onlyOwner {
        if (_receiver == address(0)) revert Errors.ZERO_ADDRESS();
        if (_feeRate >= FEE_DENOMINATOR) revert Errors.FEE_TOO_LARGE();
        feeReceiver = _receiver;
        feeRate = _feeRate;
        emit SetFee(_receiver, _feeRate);
    }

    function swapAndBridge(
        bytes32 _transferId,
        address _initiator, // initiator address
        address _srcToken,
        uint256 _amount,
        bytes calldata _swapData,
        bytes calldata _bridgeData,
        bytes calldata _permitData,
        bool _feeBeforeSwap
    ) external payable override nonReentrant returns (bytes32 orderId) {
        if (_bridgeData.length == 0) revert Errors.DATA_EMPTY();
        SwapTemp memory swapTemp;
        swapTemp.initiator = _initiator;
        swapTemp.srcToken = _srcToken;
        swapTemp.srcAmount = _amount;
        swapTemp.swapToken = _srcToken;
        swapTemp.swapAmount = _amount;
        swapTemp.transferId = _transferId;
        (swapTemp.nativeBalance, swapTemp.inputBalance) = _transferIn(
            swapTemp.srcToken,
            swapTemp.srcAmount,
            _permitData
        );

        uint256 feeAmount;
        address feeToken;
        if (_feeBeforeSwap) {
            (feeAmount, swapTemp.swapAmount) = _collectFee(swapTemp.srcToken, swapTemp.srcAmount);
            feeToken = swapTemp.srcToken;
        }

        bytes memory receiver;
        if (_swapData.length != 0) {
            SwapParam memory swapParam = abi.decode(_swapData, (SwapParam));
            (swapTemp.swapToken, swapTemp.swapAmount) = _swap(
                swapTemp.srcToken,
                swapTemp.swapAmount,
                swapTemp.inputBalance,
                swapParam
            );
            swapTemp.receiver = swapParam.receiver;
            receiver = abi.encodePacked(swapParam.receiver);
        }

        if (!_feeBeforeSwap) {
            (feeAmount, swapTemp.swapAmount) = _collectFee(swapTemp.swapToken, swapTemp.swapAmount);
            feeToken = swapTemp.swapToken;
        }

        BridgeParam memory bridge = abi.decode(_bridgeData, (BridgeParam));
        swapTemp.toChain = bridge.toChain;
        receiver = bridge.receiver;

        orderId = _doBridge(msg.sender, swapTemp.swapToken, swapTemp.swapAmount, bridge);

        emit CollectFee(swapTemp.transferId, orderId, feeToken, feeAmount, _feeBeforeSwap);

        emit SwapAndBridge(
            TW_REFERRER,
            swapTemp.initiator,
            msg.sender,
            swapTemp.transferId,
            orderId,
            swapTemp.srcToken,
            swapTemp.swapToken,
            swapTemp.srcAmount,
            swapTemp.swapAmount,
            swapTemp.toChain,
            receiver
        );
        _afterCheck(swapTemp.nativeBalance);
    }

    function swapAndCall(
        bytes32 _transferId,
        address _initiator, // initiator address
        address _srcToken,
        uint256 _amount,
        bytes calldata _swapData,
        bytes calldata _callbackData,
        bytes calldata _permitData,
        bool _feeBeforeSwap
    ) external payable override nonReentrant {
        SwapTemp memory swapTemp;
        swapTemp.initiator = _initiator;
        swapTemp.srcToken = _srcToken;
        swapTemp.srcAmount = _amount;
        swapTemp.transferId = _transferId;
        (swapTemp.nativeBalance, swapTemp.inputBalance) = _transferIn(
            swapTemp.srcToken,
            swapTemp.srcAmount,
            _permitData
        );
        if ((_swapData.length + _callbackData.length) == 0) revert Errors.DATA_EMPTY();

        (
            swapTemp.receiver,
            swapTemp.target,
            swapTemp.swapToken,
            swapTemp.swapAmount,
            swapTemp.callAmount
        ) = _doSwapAndCall(
            swapTemp.transferId,
            swapTemp.srcToken,
            swapTemp.srcAmount,
            swapTemp.inputBalance,
            _swapData,
            _callbackData,
            _feeBeforeSwap
        );

        if (swapTemp.swapAmount > swapTemp.callAmount) {
            _transfer(swapTemp.swapToken, swapTemp.receiver, (swapTemp.swapAmount - swapTemp.callAmount));
        }

        emit SwapAndCall(
            TW_REFERRER,
            swapTemp.initiator,
            msg.sender,
            swapTemp.transferId,
            swapTemp.srcToken,
            swapTemp.swapToken,
            swapTemp.srcAmount,
            swapTemp.swapAmount,
            swapTemp.receiver,
            swapTemp.target,
            swapTemp.callAmount
        );
        _afterCheck(swapTemp.nativeBalance);
    }

    // _srcToken must erc20 Token or wToken
    function onReceived(
        bytes32 _orderId,
        address _srcToken,
        uint256 _amount,
        uint256 _fromChain,
        bytes calldata _from,
        bytes calldata _swapAndCall
    ) external override nonReentrant {
        SwapTemp memory swapTemp;
        swapTemp.srcToken = _srcToken;
        swapTemp.srcAmount = _amount;
        swapTemp.swapToken = _srcToken;
        swapTemp.swapAmount = _amount;
        swapTemp.fromChain = _fromChain;
        swapTemp.toChain = block.chainid;
        swapTemp.from = _from;
        if (msg.sender != bridgeAddress) revert Errors.BRIDGE_ONLY();
        {
            uint256 balance = _getBalance(swapTemp.srcToken, address(this));
            if (balance < _amount) revert Errors.RECEIVE_LOW();
            swapTemp.nativeBalance = address(this).balance;
            swapTemp.inputBalance = balance - _amount;
        }
        (bytes memory _swapData, bytes memory _callbackData) = abi.decode(_swapAndCall, (bytes, bytes));
        if ((_swapData.length + _callbackData.length) == 0) revert Errors.DATA_EMPTY();
        bool result = true;
        uint256 minExecGas = gasForReFund;
        if (_swapData.length > 0) {
            SwapParam memory swap = abi.decode(_swapData, (SwapParam));
            swapTemp.receiver = swap.receiver;
            if (gasleft() > minExecGas) {
                try
                    this.remoteSwap{gas: (gasleft() - minExecGas)}(
                        swapTemp.srcToken,
                        swapTemp.srcAmount,
                        swapTemp.inputBalance,
                        swap
                    )
                returns (address dstToken, uint256 dstAmount) {
                    swapTemp.swapToken = dstToken;
                    swapTemp.swapAmount = dstAmount;
                } catch {
                    result = false;
                }
            }
        }

        if (_callbackData.length > 0) {
            CallbackParam memory callParam = abi.decode(_callbackData, (CallbackParam));
            if (swapTemp.receiver == address(0)) {
                swapTemp.receiver = callParam.receiver;
            }
            if (result && gasleft() > minExecGas) {
                try
                    this.remoteCall{gas: (gasleft() - minExecGas)}(callParam, swapTemp.swapToken, swapTemp.swapAmount)
                returns (address target, uint256 callAmount) {
                    swapTemp.target = target;
                    swapTemp.callAmount = callAmount;
                    swapTemp.receiver = callParam.receiver;
                } catch {}
            }
        }
        if (swapTemp.swapAmount > swapTemp.callAmount) {
            _transfer(swapTemp.swapToken, swapTemp.receiver, (swapTemp.swapAmount - swapTemp.callAmount));
        }
        emit RemoteSwapAndCall(
            _orderId,
            swapTemp.receiver,
            swapTemp.target,
            swapTemp.srcToken,
            swapTemp.swapToken,
            swapTemp.srcAmount,
            swapTemp.swapAmount,
            swapTemp.callAmount,
            swapTemp.fromChain,
            swapTemp.toChain,
            swapTemp.from
        );
        _afterCheck(swapTemp.nativeBalance);
    }

    function getFee(
        address _token,
        uint256 _amount
    ) external view override returns (address feeToken, uint256 tokenFee, uint256 afterFeeAmount) {
        feeToken = _token;
        afterFeeAmount = _amount;
        if (feeReceiver != address(0) && feeRate != 0) {
            tokenFee = (_amount * feeRate) / FEE_DENOMINATOR;
            afterFeeAmount = _amount - tokenFee;
        }
    }

    function getInputBeforeFee(
        address _token,
        uint256 _amount
    ) external view override returns (address feeToken, uint256 inputAmount, uint256 fee) {
        feeToken = _token;
        inputAmount = _amount;
        if (feeReceiver != address(0) && feeRate != 0) {
            inputAmount = (_amount * FEE_DENOMINATOR) / (FEE_DENOMINATOR - feeRate) + 1;
            fee = inputAmount - _amount;
        }
    }

    function remoteSwap(
        address _srcToken,
        uint256 _amount,
        uint256 _initBalance,
        SwapParam memory swapParam
    ) external returns (address dstToken, uint256 dstAmount) {
        if (msg.sender != address(this)) revert Errors.SELF_ONLY();
        (dstToken, dstAmount) = _swap(_srcToken, _amount, _initBalance, swapParam);
    }

    function remoteCall(
        CallbackParam memory _callbackParam,
        address _callToken,
        uint256 _amount
    ) external returns (address target, uint256 callAmount) {
        if (msg.sender != address(this)) revert Errors.SELF_ONLY();
        target = _callbackParam.target;
        callAmount = _callBack(_amount, _callToken, _callbackParam);
    }

    function _doSwapAndCall(
        bytes32 _transferId,
        address _srcToken,
        uint256 _amount,
        uint256 _initBalance,
        bytes memory _swapData,
        bytes memory _callbackData,
        bool _feeBeforeSwap
    ) internal returns (address receiver, address target, address dstToken, uint256 swapOutAmount, uint256 callAmount) {
        swapOutAmount = _amount;
        dstToken = _srcToken;

        uint256 feeAmount;
        if (_feeBeforeSwap) {
            (feeAmount, swapOutAmount) = _collectFee(_srcToken, _amount);
            emit CollectFee(_transferId, bytes32(0x0), _srcToken, feeAmount, _feeBeforeSwap);
        }

        if (_swapData.length > 0) {
            SwapParam memory swapParam = abi.decode(_swapData, (SwapParam));
            (dstToken, swapOutAmount) = _swap(_srcToken, swapOutAmount, _initBalance, swapParam);
            receiver = swapParam.receiver;
        }

        if (!_feeBeforeSwap) {
            (feeAmount, swapOutAmount) = _collectFee(dstToken, swapOutAmount);
            emit CollectFee(_transferId, bytes32(0x0), dstToken, feeAmount, _feeBeforeSwap);
        }

        if (_callbackData.length > 0) {
            CallbackParam memory callbackParam = abi.decode(_callbackData, (CallbackParam));
            callAmount = _callBack(swapOutAmount, dstToken, callbackParam);
            receiver = callbackParam.receiver;
            target = callbackParam.target;
        }
    }

    function _doBridge(
        address _sender,
        address _token,
        uint256 _amount,
        BridgeParam memory _bridge
    ) internal returns (bytes32 _orderId) {
        uint256 value;
        address bridgeAddr = bridgeAddress;
        if (_isNative(_token)) {
            value = _amount + _bridge.nativeFee;
        } else {
            value = _bridge.nativeFee;
            IERC20(_token).forceApprove(bridgeAddr, _amount);
        }
        _orderId = IButterBridgeV3(bridgeAddr).swapOutToken{value: value}(
            _sender,
            _token,
            _bridge.receiver,
            _amount,
            _bridge.toChain,
            _bridge.data
        );
    }

    function _collectFee(address _token, uint256 _amount) internal returns (uint256 fee, uint256 remain) {
        remain = _amount;
        address _feeReceiver = feeReceiver;
        uint256 _feeRate = feeRate;
        if (_feeReceiver != address(0) && _feeRate != 0) {
            fee = (_amount * _feeRate) / FEE_DENOMINATOR;
            remain = _amount - fee;
            _transfer(_token, _feeReceiver, fee);
        }
    }

    function _setBridgeAddress(address _bridgeAddress) internal returns (bool) {
        if (!_bridgeAddress.isContract()) revert Errors.NOT_CONTRACT();
        bridgeAddress = _bridgeAddress;
        emit SetBridgeAddress(_bridgeAddress);
        return true;
    }

    function rescueFunds(address _token, uint256 _amount) external onlyOwner {
        _transfer(_token, msg.sender, _amount);
    }

    receive() external payable {}
}
