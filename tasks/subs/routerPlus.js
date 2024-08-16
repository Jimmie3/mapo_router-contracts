let { create, createZk, readFromFile, writeToFile } = require("../../utils/create.js");
let { task } = require("hardhat/config");
let { getConfig } = require("../../configs/config");
let { setAuthorization, setFee } = require("../utils/util.js");
let { deploy_contract, getTronWeb, setTronAuthorization, tronSetFee } = require("../utils/tronUtil.js");
module.exports = async (taskArgs, hre) => {
    const { getNamedAccounts, network } = hre;
    const { deployer } = await getNamedAccounts();

    console.log("\ndeployer :", deployer);
    let config = getConfig(network.name);
    if (!config) {
        throw "config not set";
    }
    await hre.run("routerPlus:deploy", { wtoken: config.wToken });

    let deploy_json = await readFromFile(network.name);

    let router_addr = deploy_json[network.name]["RouterPlus"]["addr"];

    /*
    await hre.run("routerPlus:deployTransferProxy",{});

    deploy_json = await readFromFile(network.name)

    let proxy_addr =  deploy_json[network.name]["TransferProxy"]

    config.executors.push(proxy_addr);
    */

    let executors_s = config.executors.join(",");

    await hre.run("routerPlus:setAuthorization", { router: router_addr, executors: executors_s });
    /*
            await hre.run("routerPlus:setFee",{
                router:router_addr,
                feereceiver:config.plus.fee.receiver,
                feerate:config.plus.fee.feeRate,
                fixedfee:config.plus.fee.fixedFee
            })
        */
};

task("routerPlus:deploy", "deploy butter router plus")
    .addParam("wtoken", "wtoken address")
    .setAction(async (taskArgs, hre) => {
        const { getNamedAccounts, ethers, network } = hre;

        let plus;
        if (network.name === "Tron" || network.name === "TronTest") {
            let tronWeb = await getTronWeb(network.name);
            let deployer = "0x" + tronWeb.defaultAddress.hex.substring(2);
            let wtoken = tronWeb.address.toHex(taskArgs.wtoken).replace(/^(41)/, "0x");
            console.log("deployer :", tronWeb.address.fromHex(deployer));
            plus = await deploy_contract(hre.artifacts, "ButterRouterPlus", [deployer, wtoken], tronWeb);
        } else {
            const { deployer } = await getNamedAccounts();
            console.log("\ndeploy butter router plus deployer :", deployer);
            let chainId = await hre.network.config.chainId;
            if (chainId === 324 || chainId === 280) {
                plus = await createZk("ButterRouterPlus", [deployer, taskArgs.wtoken], hre);
            } else {
                let salt = process.env.PLUS_DEPLOY_SALT;
                let ButterRouterPlus = await ethers.getContractFactory("ButterRouterPlus");
                let param = ethers.utils.defaultAbiCoder.encode(["address", "address"], [deployer, taskArgs.wtoken]);
                let result = await create(salt, ButterRouterPlus.bytecode, param);
                plus = result[0];
            }
            console.log("router plus address :", plus);
        }
        let deploy = await readFromFile(network.name);
        if (!deploy[network.name]["RouterPlus"]) {
            deploy[network.name]["RouterPlus"] = {};
        }
        deploy[network.name]["RouterPlus"]["addr"] = plus;
        await writeToFile(deploy);
    });

task("routerPlus:deployTransferProxy", "deploy transfer proxy").setAction(async (taskArgs, hre) => {
    const { getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();

    console.log("\ndeploy transfer proxy deployer :", deployer);
    let chainId = await hre.network.config.chainId;
    let proxy;
    if (chainId === 324 || chainId === 280) {
        proxy = await createZk("TransferProxy", [], hre);
    } else {
        let salt = process.env.TRANSFER_PROXY_SALT;
        let TransferProxy = await ethers.getContractFactory("TransferProxy");
        let result = await create(salt, TransferProxy.bytecode, "0x");
        proxy = result[0];
    }
    console.log("TransferProxy address :", proxy);

    let deploy = await readFromFile(network.name);

    deploy[network.name]["TransferProxy"] = proxy;

    await writeToFile(deploy);
});

task("routerPlus:setAuthorization", "set Authorization")
    .addParam("router", "router address")
    .addParam("executors", "executors address array")
    .addOptionalParam("flag", "flag, default: true", true, types.boolean)
    .setAction(async (taskArgs, hre) => {
        const { deployments, getNamedAccounts, network } = hre;
        if (network.name === "Tron" || network.name === "TronTest") {
            let tronWeb = await getTronWeb(network.name);
            let deployer = "0x" + tronWeb.defaultAddress.hex.substring(2);
            await setTronAuthorization(tronWeb, hre.artifacts, taskArgs.router, taskArgs.executors, taskArgs.flag);
        } else {
            const { deployer } = await getNamedAccounts();

            console.log("\nset authorization deployer :", deployer);

            await setAuthorization(taskArgs.router, taskArgs.executors, taskArgs.flag);
        }
    });

task("routerPlus:setFee", "set fee ")
    .addParam("router", "router address")
    .addParam("feereceiver", "feeReceiver address")
    .addParam("feerate", "feeRate")
    .addParam("fixedfee", "fixedFee")
    .setAction(async (taskArgs, hre) => {
        const { deployments, getNamedAccounts, ethers } = hre;
        const { deploy } = deployments;
        const { deployer } = await getNamedAccounts();

        console.log("set fee deployer :", deployer);

        if (network.name === "Tron" || network.name === "TronTest") {
            let tronWeb = await getTronWeb(network.name);
            await tronSetFee(
                tronWeb,
                hre.artifacts,
                taskArgs.router,
                taskArgs.feereceiver,
                taskArgs.feerate,
                taskArgs.fixedfee
            );
        } else {
            await setFee(taskArgs.router, taskArgs.feereceiver, taskArgs.feerate, taskArgs.fixedfee);
        }
    });

task("routerPlus:setAuthFromConfig", "set Authorization from config file")
    .addOptionalParam("router", "router address", "router", types.string)
    .setAction(async (taskArgs, hre) => {
        const { getNamedAccounts } = hre;
        const { deployer } = await getNamedAccounts();
        console.log("set Authorization from config file deployer :", deployer);

        let config = getConfig(network.name);
        if (!config) {
            throw "config not set";
        }

        if (network.name === "Tron" || network.name === "TronTest") {
            let tronWeb = await getTronWeb(network.name);
            await tronSetAuthFromConfig(tronWeb, hre.artifacts, network.name, taskArgs.router, config);
        } else {
            let deploy_json = await readFromFile(network.name);

            let router_addr = taskArgs.router;
            if (router_addr === "router") {
                if (deploy_json[network.name]["RouterPlus"] === undefined) {
                    throw "can not get router address";
                }
                router_addr = deploy_json[network.name]["RouterPlus"]["addr"];
            }
            console.log("router: ", router_addr);

            let proxy_addr = deploy_json[network.name]["TransferProxy"];
            if (proxy_addr != undefined) {
                console.log("proxy: ", proxy_addr);
                config.executors.push(proxy_addr);
            }

            let Router = await ethers.getContractFactory("ButterRouterPlus");
            let router = Router.attach(router_addr);

            console.log(router.address);

            let executors = [];
            for (let i = 0; i < config.executors.length; i++) {
                let result = await await router.approved(config.executors[i]);
                if (result === false || result === undefined) {
                    executors.push(config.executors[i]);
                }
            }

            if (executors.length > 0) {
                let executors_s = executors.join(",");
                console.log("routers to set :", executors_s);

                await setAuthorization(router_addr, executors_s, true);
            }
        }

        console.log("RouterPlus sync authorization from config file.");
    });

task("routerPlus:getFee", "set Authorization")
    .addParam("router", "router address")
    .addParam("token", "executors address array")
    .addParam("amount", "executors address array")
    .addParam("type", "executors address array")
    .setAction(async (taskArgs, hre) => {
        const { deployments, getNamedAccounts, network } = hre;
        let rst;

        if (network.name === "Tron" || network.name === "TronTest") {
            let tronWeb = await getTronWeb(network.name);
            let deployer = "0x" + tronWeb.defaultAddress.hex.substring(2);
            let Router = await hre.artifacts.readArtifact("ButterRouterPlus");
            let router = await tronWeb.contract(Router.abi, taskArgs.router);
            rst = await router.getFee(taskArgs.amount, taskArgs.token, taskArgs.type).call();
        } else {
            const { deployer } = await getNamedAccounts();

            console.log("\nset authorization deployer :", deployer);

            let Router = await ethers.getContractFactory("ButterRouterPlus");

            let router = Router.attach(router_addr);

            rst = await router.getFee(taskArgs.amount, taskArgs.token, taskArgs.type);
        }
        console.log(rst);
    });
