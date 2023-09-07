# Brief Description


## Contract Deployment and SetUp Workflow

### Pre-requirement

Since all of the contracts are developed in Hardhat development environment, developers need to install Hardhat before working through our contracts. The hardhat installation tutorial can be found here[hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#installation)

### install

```shell
npm install
```

### create an .env file and fill following in the contents

```
PRIVATE_KEY =  
ALCHEMY_KEY = 
DEPLOY_FACTORY = 
ROUTER_DEPLOY_SALT = 
PLUS_DEPLOY_SALT = 
SWAP_ADAPTER_DEPLOY_SALT = 
RECEIVER_DEPLOY_SALT = 
AGG_ADAPTER_SALT = 
FEE_RECEIVER_SAlT = 
TRANSFER_PROXY_SALT = 
```

### Compiling contracts

Simply useing hardhat built-in compile task to compile contracts.

```
$ npx hardhat compile
Compiling...
Compiled 1 contract successfully
```

The compiled artifacts will be saved in the `artifacts/` directory by default

### Testing

```
Compiled 6 Solidity files successfully
  ButterRouterV2
    ✔ setFee only owner (1442ms)
    ✔ setMosAddress only owner (147ms)
    ✔ setAuthorization only owner (129ms)
    ✔ setDexExecutor only owner (122ms)
    ✔ rescueFunds correct (130ms)
    ✔ rescueFunds only owner (129ms)
    ✔ setFee feeReceiver zero address (126ms)
    ✔ setFee feeRate less than 1000000 (124ms)
    ✔ setFee correct  (137ms)
    ✔ setMosAddress _mosAddress must be contract (100ms)
    ✔ setDexExecutor dexExecutor must be contract (111ms)
    ✔ setMosAddress correct (120ms)
    ✔ setDexExecutor correct (132ms)
    ✔ setAuthorization only owner (110ms)
    ✔ setAuthorization correct (135ms)
    ✔ swapAndCall (2920ms)
    ✔ swapAndCall (2826ms)
    ✔ swapAndBridge (2870ms)
    ✔ swapAndCall (2931ms)
    ✔ remoteSwapAndCall (2808ms)
    ✔ remoteSwapAndCall _makeUniV3Swap -> native (2764ms)
    ✔ remoteSwapAndCall _makeUniV3Swap -> tokens (2735ms)
    ✔ remoteSwapAndCall _makeUniV2Swap -> swapExactTokensForETH (2740ms)
    ✔ remoteSwapAndCall _makeUniV2Swap -> swapExactTokensForTokens (2911ms)
    ✔ remoteSwapAndCall _makeUniV2Swap -> swapExactETHForTokens (2813ms)
    ✔ remoteSwapAndCall _makeCurveSwap (2932ms)
    ✔ remoteSwapAndCall buy nft seaport (2799ms)


  27 passing (37s)
```

### Deploy and setup

The deploy script is located in tasks folder . We can run the following command to deploy.


#### plus

1.deploy and set up before run this task, set task/config.js

```
npx hardhat routerPlus --network <network>
```

subtasks

1.routerPlus:deploy

```
npx hardhat routerV2:deploy  --wtoken <wtoken address> --network <network>
```

2.routerPlus:deployTransferProxy

```
npx hardhat routerPlus:deployTransferProxy  --network <network>
```

3.routerPlus:setAuthorization

```
npx hardhat routerPlus:setAuthorization --router <router address> --executors <excutor1,excutor2,..> --flag <flag> --network <network>
```

4.routerPlus:setFee

```
npx hardhat routerPlus:setFee --router <router address> --feereceiver <receiver address> --feerate <rate> --fixedfee <fixedfee> --network <network>
```

#### deployFeeReceiver

```
npx hardhat deployFeeReceiver --payees <addr1,addr2,..> --shares <share1,share2,..> --network <network>
```

#### receiver

subtasks

1.deploy receiver

```
npx hardhat receiver --router <router address> --network <network>
```

2.receiver:setRouter

```
npx hardhat receiver:setRouter --receiver <receiver address> --name <name> --router <router> --network <network>
```

name:

cbridge -> setCBridgeMessageBus

amarok -> setAmarokRouter

stargate -> setStargateRouter

butter -> setAuthorization

router is this address for the bridge router
