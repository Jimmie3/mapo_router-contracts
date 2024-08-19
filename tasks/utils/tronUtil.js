const TronWeb = require("tronweb");
require("dotenv").config();

exports.setTronFeeV2 = async function (tronWeb, artifacts, router_addr, receiver, rate) {
    let Router = await artifacts.readArtifact("RouterPlusV2");
    if (router_addr.startsWith("0x")) {
        router_addr = tronWeb.address.fromHex(router_addr);
    }
    let router = await tronWeb.contract(Router.abi, router_addr);
    receiver = tronWeb.address.toHex(receiver).replace(/^(41)/, "0x");
    await router.setFee(receiver, rate).send();
    console.log(`Router ${router_addr} setFee  receiver(${receiver}) rate(${rate}) succeed`);
};

exports.setTronAuthorization = async function (tronWeb, artifacts, router_addr, executors, flag) {
    await setAuthorization(tronWeb, artifacts, network, router_addr, executors_s, true);
};

exports.tronSetFee = async function (tronWeb, artifacts, router_addr, feereceiver, feerate, fixedfee) {
    let Router = await artifacts.readArtifact("ButterRouterPlus");
    if (router_addr.startsWith("0x")) {
        router_addr = tronWeb.address.fromHex(router_addr);
    }
    let router = await tronWeb.contract(Router.abi, router_addr);

    let receiver = tronWeb.address.toHex(feereceiver).replace(/^(41)/, "0x");

    await router.setFee(receiver, feerate, fixedfee).send();

    console.log(`Router ${router_addr} setFee rate(${feerate}), fixed(${fixedfee}), receiver(${feereceiver}) succeed`);
};

exports.tronSetAuthFromConfig = async function (tronWeb, artifacts, router_addr, config) {
    let Router = await artifacts.readArtifact("ButterRouterPlus");
    if (router_addr.startsWith("0x")) {
        router_addr = tronWeb.address.fromHex(router_addr);
    }
    let router = await tronWeb.contract(Router.abi, router_addr);
    let executors = [];
    for (let i = 0; i < config.executors.length; i++) {
        let result = await router.approved(config.executors[i]).call();
        console.log(result);
        if (result === false || result === undefined) {
            executors.push(config.executors[i]);
        }
    }
    if (executors.length > 0) {
        let executors_s = executors.join(",");

        console.log("routers to set :", executors_s);

        await setAuthorization(tronWeb, artifacts, router_addr, executors_s, true);
    }
    console.log("RouterV2 sync authorization from config file.");
};

exports.tronRemoveAuthFromConfig = async function (tronWeb, artifacts, router_addr, config) {
    let Router = await artifacts.readArtifact("ButterRouterPlus");
    if (router_addr.startsWith("0x")) {
        router_addr = tronWeb.address.fromHex(router_addr);
    }
    let router = await tronWeb.contract(Router.abi, router_addr);
    let removes = [];
    for (let i = 0; i < config.removes.length; i++) {
        let result = await router.approved(config.removes[i]).call();
        console.log(result);
        if (result === true) {
            removes.push(config.removes[i]);
        }
    }
    if (executors.length > 0) {
        let removes_s = removes.join(",");
        console.log("routers to remove :", removes_s);
        await setAuthorization(tronWeb, artifacts, router_addr, removes_s, false);
    }
    console.log("RouterPlusV2 remove authorization from config file.");
};


async function setAuthorization(tronWeb, artifacts, router_addr, executors, flag) {
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
}

exports.deploy_contract = async function deploy_contract(artifacts, name, args, tronWeb) {
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
