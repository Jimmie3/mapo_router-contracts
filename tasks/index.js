let { task } = require("hardhat/config");

task("routerPlus", "deploy butter router V2 contract and set", require("./subs/routerPlus.js"));

task("deployFeeReceiver", "deploy feeReceiver", require("./subs/deployFeeReceiver.js"))
    .addParam("payees", "payees address array")
    .addParam("shares", "shares array");

task("receiver", "deploy Receiver", require("./subs/receiver.js")).addParam("router", "router address");
