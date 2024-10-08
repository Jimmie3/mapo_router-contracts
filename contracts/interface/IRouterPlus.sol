// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IRouterPlus {
    struct BridgeParam {
        uint256 toChain;
        uint256 nativeFee;
        bytes receiver;
        bytes data;
    }

    event SwapAndBridge(
        address indexed referrer,
        address indexed initiator,
        address indexed from,
        bytes32 transferId,
        bytes32 orderId,
        address originToken,
        address bridgeToken,
        uint256 originAmount,
        uint256 bridgeAmount,
        uint256 toChain,
        bytes to
    );

    event SwapAndCall(
        address indexed referrer,
        address indexed initiator,
        address indexed from,
        bytes32 transferId,
        address originToken,
        address swapToken,
        uint256 originAmount,
        uint256 swapAmount,
        address receiver,
        address target,
        uint256 callAmount
    );

    event RemoteSwapAndCall(
        bytes32 indexed orderId,
        address indexed receiver,
        address indexed target,
        address originToken,
        address swapToken,
        uint256 originAmount,
        uint256 swapAmount,
        uint256 callAmount,
        uint256 fromChain,
        uint256 toChain,
        bytes from
    );

    // 1. swap: _swapData.length > 0 and _bridgeData.length == 0
    // 2. swap and call: _swapData.length > 0 and _callbackData.length > 0
    function swapAndCall(
        bytes32 _transferId,
        address _initiator, // initiator address
        address _srcToken,
        uint256 _amount,
        bytes calldata _swapData,
        bytes calldata _callbackData,
        bytes calldata _permitData,
        bool feeBeforeSwap
    ) external payable;

    // 1. bridge:  _swapData.length == 0 and _bridgeData.length > 0
    // 2. swap and bridge: _swapData.length > 0 and _bridgeData.length > 0
    function swapAndBridge(
        bytes32 _transferId,
        address _initiator, // initiator address
        address _srcToken,
        uint256 _amount,
        bytes calldata _swapData,
        bytes calldata _bridgeData,
        bytes calldata _permitData,
        bool feeBeforeSwap
    ) external payable returns (bytes32 orderId);

    function getFee(
        address _token,
        uint256 _amount
    ) external view returns (address feeToken, uint256 tokenFee, uint256 afterFeeAmount);

    function getInputBeforeFee(
        address _token,
        uint256 _amount
    ) external view returns (address feeToken, uint256 inputAmount, uint256 fee);
}
