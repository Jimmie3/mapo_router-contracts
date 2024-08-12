const TronWeb = require("tronweb");
require("dotenv").config();


exports.setTronFeeV2 = async function (tronWeb, artifacts, router_addr, receiver, rate) {
    let Router = await artifacts.readArtifact("RouterPlusV2");
    if (router_addr.startsWith("0x")) {
        router_addr = tronWeb.address.fromHex(router_addr);
    }
    let router = await tronWeb.contract(Router.abi, router_addr);
    receiver = tronWeb.address.toHex(receiver).replace(/^(41)/, "0x")
    await router.setFee(receiver, rate).send();
    console.log(`Router ${router_addr} setFee  receiver(${receiver}) rate(${rate}) succeed`);
};

exports.setTronAuthorization = async function (tronWeb, artifacts, router_addr, executors, flag) {
    let Router = await artifacts.readArtifact("ButterRouterPlus");
    if (router_addr.startsWith("0x")) {
        router_addr = tronWeb.address.fromHex(router_addr);
    }
    let router = await tronWeb.contract(Router.abi, router_addr);
    let executorList = executors.split(",");
    if (executorList.length < 1) {
        console.log("executors is empty ...");
        return;
    }
    let executorsHex = [];
    for (let i = 0; i < executorList.length; i++) {
        executorsHex.push(tronWeb.address.toHex(executorList[i]).replace(/^(41)/, "0x"));
    }
    await router.setAuthorization(executorsHex, flag).send();
    console.log(`Router ${router_addr} setAuthorization ${executorList} succeed`);
};

exports.deploy_contract = async function deploy_contract(artifacts, name, args, network, tronWeb) {
    let c = await artifacts.readArtifact(name);
    let contract_instance = await tronWeb.contract().new({
        abi: c.abi,
        bytecode: c.bytecode,
        feeLimit: 15000000000,
        callValue: 0,
        parameters: args,
    });
    // console.log(`${name} deployed on: ${contract_instance.address}`);

    let addr = tronWeb.address.fromHex(contract_instance.address);
    console.log(`${name} deployed on: ${addr} ( ${contract_instance.address} )`);

    return addr;
    //return "0x" + contract_instance.address.substring(2);
};

exports.getTronWeb = async function (network) {
    if (network === "Tron" || network === "TronTest") {
        if (network === "Tron") {
            return new TronWeb(
                "https://api.trongrid.io/",
                "https://api.trongrid.io/",
                "https://api.trongrid.io/",
                process.env.TRON_PRIVATE_KEY
            );
        } else {
            return new TronWeb(
                "https://api.nileex.io/",
                "https://api.nileex.io/",
                "https://api.nileex.io/",
                process.env.TRON_PRIVATE_KEY
            );
        }
    } else {
        throw "unsupported network";
    }
};
