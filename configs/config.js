//wToken,mos,and executors make sure these addresses must be contract;
let config = new Map([
    [
        "Eth",
        {
            wToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "100000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0x0000000022D53366457F9d5E68Ec105046FC4383", //curve
                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch v5
                "0x111111125421cA6dc452d289314280a0f8842A65", //1inch v6
                "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", //sushi
                "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", //univ2
                "0xE592427A0AEce92De3Edee1F18E0157C05861564", //univ3
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // open ocean
                "0x3321dE36B6C29A6fa102A67bd5C48E5756Baa596", // omni adapter
                "0xeF4fB24aD0916217251F553c0596F8Edc630EB66", // DLN
            ],
        },
    ],

    [
        "Avalanche",
        {
            wToken: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
            plus: {
                mos: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "12000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0x45A01E4e04F14f7A4a6702c74187c5F6222033cd", //stargate
                "0x3335733c454805df6a77f825f266e136FB4a3333", //rubic
                "0x0000000022D53366457F9d5E68Ec105046FC4383", //curve
                "0x60aE616a2155Ee3d9A68541Ba4544862310933d4", //joe
                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch
                "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106", //pangolin
                "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", //sushi
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // openocean
                "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", // lifi
                "0x2C86f0FF75673D489b7D72D9986929a2b0Ed596C", //xy
                "0xce16F69375520ab01377ce7B88f5BA8C48F8D666", //squid
                "0x8f957ed3f969d7b6e5d6df81e61a5ff45f594dd1", // swft
                "0xeF4fB24aD0916217251F553c0596F8Edc630EB66", // DLN
            ],
        },
    ],

    [
        "Bsc",
        {
            wToken: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "600000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch v5
                "0x111111125421cA6dc452d289314280a0f8842A65", //1inch v6
                "0x10ED43C718714eb63d5aA57B78B54704E256024E", //pancake
                "0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2", //uni SwapRouter02
                "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", //sushi
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // openocean
                "0x3321dE36B6C29A6fa102A67bd5C48E5756Baa596", // omni adapter
                "0xedf2021f41AbCfE2dEA4427E1B61f4d0AA5aA4b8", //izumi
                "0xeF4fB24aD0916217251F553c0596F8Edc630EB66", // DLN
            ],
        },
    ],

    [
        "Matic",
        {
            wToken: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "200000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xaaab45a0ea5d8615411877178de9fa7a54068dde", // chain pool
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch v5
                "0x111111125421cA6dc452d289314280a0f8842A65", //1inch v6
                "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", //quick
                "0xf5b509bB0909a69B1c207E495f687a596C168E12", //quickv3
                "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", //sushi
                "0xE592427A0AEce92De3Edee1F18E0157C05861564", //univ3
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // openocean
                "0x032b241De86a8660f1Ae0691a4760B426EA246d7", //izumi
                "0xeF4fB24aD0916217251F553c0596F8Edc630EB66", // DLN
            ],
        },
    ],

    [
        "Arbitrum",
        {
            wToken: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
            plus: {
                mos: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "100000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch v5
                "0x111111125421cA6dc452d289314280a0f8842A65", //1inch v6
                "0xE592427A0AEce92De3Edee1F18E0157C05861564", //univ3
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // openocean
                "0x01fDea353849cA29F778B2663BcaCA1D191bED0e", //izumi
                "0xeF4fB24aD0916217251F553c0596F8Edc630EB66", // DLN
            ],
        },
    ],

    [
        "Optimism",
        {
            wToken: "0x4200000000000000000000000000000000000006",
            plus: {
                mos: "0x4200000000000000000000000000000000000006",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "100000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch v5
                "0x111111125421cA6dc452d289314280a0f8842A65", //1inch v6
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // openocean
                "0xeF4fB24aD0916217251F553c0596F8Edc630EB66", // DLN
            ],
        },
    ],

    [
        "zkSync",
        {
            wToken: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
            plus: {
                mos: "0xBEf06a32166C4B819fF04cCfa887733B8bb67eB5",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "100000000000000000",
                },
            },
            plusV2: {
                bridge: "0xBEf06a32166C4B819fF04cCfa887733B8bb67eB5",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0x58A64D2bF0032ac05216DDC9cadD0F9DB828BBF5", // butter router v3.0
                "0xaC74fE3b317023fA1BB2bEAB1771406Bf6f15861", // swapAdapter

                "0x6e2B76966cbD9cF4cC2Fa0D76d24d5241E0ABC2F", //1inch v5
                "0x6fd4383cB451173D5f9304F041C7BCBf27d561fF", //1inch v6
                "0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295", //sync-swap
                "0x943ac2310D9BC703d6AB5e5e76876e212100f894", //izumi
                "0x36A1aCbbCAfca2468b85011DDD16E7Cb4d673230", //openocean
            ],
        },
    ],

    [
        "Aurora",
        {
            wToken: "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB",
            plus: {
                mos: "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "100000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0x3335733c454805df6a77f825f266e136FB4a3333", //rubic
                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch
                "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", // li.fi
                "0x2CB45Edb4517d5947aFdE3BEAbF95A582506858B", //trisolaris
                "0xa3a1eF5Ae6561572023363862e238aFA84C72ef5", //wanna
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // openocean
            ],
        },
    ],

    [
        "Okt",
        {
            wToken: "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15",
            plus: {
                mos: "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "5000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xc0006Be82337585481044a7d11941c0828FFD2D4", // openocean
                "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", // lifi
            ],
        },
    ],

    [
        "Boba",
        {
            wToken: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
            plus: {
                mos: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "100000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0x17C83E2B96ACfb5190d63F5E46d93c107eC0b514", //oolong
                "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", // Li.Fi
            ],
        },
    ],

    [
        "Celo",
        {
            wToken: "0x471EcE3750Da237f93B8E339c536989b8978a438",
            plus: {
                mos: "0x471EcE3750Da237f93B8E339c536989b8978a438",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "300000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0x0000000022D53366457F9d5E68Ec105046FC4383", //curve
                "0xce16F69375520ab01377ce7B88f5BA8C48F8D666", //SQUID
                "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", // lifi
            ],
        },
    ],


    [
        "Fantom",
        {
            wToken: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
            plus: {
                mos: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "500000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6", //stargate
                "0x3335733c454805df6a77f825f266e136FB4a3333", //rubic
                "0x0000000022D53366457F9d5E68Ec105046FC4383", //curve
                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch
                "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", //sushi
                "0x6b3d631B87FE27aF29efeC61d2ab8CE4d621cCBF", //soul
                "0x16327E3FbDaCA3bcF7E38F5Af2599D2DDc33aE52", //spirit
                "0xF491e7B69E4244ad4002BC14e878a34207E38c29", //spooky
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // openocean
                "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", // lifi
                "0xDa241399697fa3F6cD496EdAFab6191498Ec37F5", //xy
                "0xce16F69375520ab01377ce7B88f5BA8C48F8D666", //squid
                "0x8f957ed3f969d7b6e5d6df81e61a5ff45f594dd1", // swft
            ],
        },
    ],

    [
        "Gnosis",
        {
            wToken: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
            plus: {
                mos: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "150000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0x0000000022D53366457F9d5E68Ec105046FC4383", //curve
                "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", //sushi
                "0x1C232F01118CB8B424793ae03F870aa7D0ac7f77", //Honeyswap
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", // openocean
                "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", // lifi
            ],
        },
    ],


    [
        "Klaytn",
        {
            wToken: "0x19aac5f612f524b754ca7e7c41cbfa2e981a4432",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0xEf71750C100f7918d6Ded239Ff1CF09E81dEA92D", //claimswap
                "0xe0fbB27D0E7F3a397A67a9d4864D4f4DD7cF8cB9", // klayswap
                "0x3EF68D3f7664b2805D4E88381b64868a56f88bC4", // izumi
                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch v5
                "0x111111125421cA6dc452d289314280a0f8842A65", //1inch v6
            ],
        },
    ],

    [
        "Map",
        {
            wToken: "0x13cb04d4a5dfb6398fc5ab005a6c84337256ee23",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "10000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0x0bce9e0ebd4fd4d6562495af45c4aaa0c1f7f3d7", //hiveswap v2
                "0x3EF68D3f7664b2805D4E88381b64868a56f88bC4", //hiveswap pro
                "0x6628a22D9E16E42225a46ceaDd93dACFefAcfE1b", //hiveswap v3
                "0x3321dE36B6C29A6fa102A67bd5C48E5756Baa596", // omni adapter
                "0x3EF68D3f7664b2805D4E88381b64868a56f88bC4", // izumi
            ],
        },
    ],

    [
        "zkEvm",
        {
            wToken: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9",
            plus: {
                mos: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0x3335733c454805df6a77f825f266e136FB4a3333", //rubic
                "0x3689D3B912d4D73FfcAad3a80861e7caF2d4F049", //xy
                "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE", // li.fi
                "0xC626845BF4E6a5802Ef774dA0B3DfC6707F015F7", // owlto
                "0x8f957ed3f969d7b6e5d6df81e61a5ff45f594dd1", // swft
            ],
        },
    ],

    [
        "Linea",
        {
            wToken: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
            plus: {
                mos: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0x032b241De86a8660f1Ae0691a4760B426EA246d7", //izumi
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", //openocean
                "0xeF4fB24aD0916217251F553c0596F8Edc630EB66", // DLN
            ],
        },
    ],

    [
        "Base",
        {
            wToken: "0x4200000000000000000000000000000000000006",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43", //Aerodrome Router
                "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD", // UniSwap UniversalRouter
                "0x02F55D53DcE23B4AA962CC68b0f685f26143Bdb2", // izumi
                "0x6352a56caadc4f1e25cd6c75970fa768a3304e64", // openocean
                "0x1111111254eeb25477b68fb85ed929f73a960582", //1inch v5
                "0x111111125421cA6dc452d289314280a0f8842A65", //1inch v6
                "0xeF4fB24aD0916217251F553c0596F8Edc630EB66", // DLN
            ],
        },
    ],

    [
        "Conflux",
        {
            wToken: "0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swap Adpter

                "0x62b0873055bf896dd869e172119871ac24aea305", // Swappi
            ],
        },
    ],

    [
        "Tron",
        {
            wToken: "TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR",
            plus: {
                mos: "TYMpgB8Q9vSoGtkyE3hXsvUrpte3KCDGj6",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "TYMpgB8Q9vSoGtkyE3hXsvUrpte3KCDGj6",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "TPYm4fQJxmoBuhAbNWCBx2ehzhVJ1fxFNP",
                "TYCXm93z8oAhhdT2C2VqEFbSnBAmWzXqo1",
                "TFVisXFaijZfeyeSjCEVkHfex7HGdTxzF9", // sun smart router
                "TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax", // sun v2 route
                "TQAvWQpT9H916GckwWDJNhYZvQMkuRL7PN", // sun v3 route
            ],
        },
    ],

    [
        "BEVM",
        {
            wToken: "0x09Ff8E49D0EA411A3422ed95E8f5497D4241F532",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: ["0xEE030ec6F4307411607E55aCD08e628Ae6655B86", "0xaa301070448385cfAaC5913A67B16C4392944a8f"],
        },
    ],

    [
        "Merlin",
        {
            wToken: "0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", //butter router v3
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", //swapAdapter
                "0x1aFa5D7f89743219576Ef48a9826261bE6378a68", //izumi
            ],
        },
    ],

    [
        "Blast",
        {
            wToken: "0x4300000000000000000000000000000000000004",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdater

                "0x44889b52b71E60De6ed7dE82E2939fcc52fB2B4E", //Thruster
                "0xA3F50FeBA40dd3E884688C0AF72C4054D07a1c50", //izumi
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", //openocean
                "0xC626845BF4E6a5802Ef774dA0B3DfC6707F015F7", // owlto
            ],
        },
    ],

    [
        "Scroll",
        {
            wToken: "0x5300000000000000000000000000000000000004",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", // butter router v3.0
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0x2db0AFD0045F3518c77eC6591a542e326Befd3D7", //izumi
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", //openocean
                "0x8f957ed3f969d7b6e5d6df81e61a5ff45f594dd1", // swft
            ],
        },
    ],

    [
        "Mantle",
        {
            wToken: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xEE030ec6F4307411607E55aCD08e628Ae6655B86", //butter router v3
                "0xaa301070448385cfAaC5913A67B16C4392944a8f", // swapAdapter

                "0x25C030116Feb2E7BbA054b9de0915E5F51b03e31", //izumi
                "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64", //openocean
            ],
        },
    ],

    [
        "Ainn",
        {
            wToken: "0x1470a4831F76954686BfB4dE8180F7469EA8dE6F",
            plus: {
                mos: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000000",
                },
            },
            plusV2: {
                bridge: "0xfeB2b97e4Efce787c08086dC16Ab69E063911380",
                fee: {
                    receiver: "0x4A53841B9b16182f996a65aAb407e7622CBCf966",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: ["0xEE030ec6F4307411607E55aCD08e628Ae6655B86", "0xaa301070448385cfAaC5913A67B16C4392944a8f"],
        },
    ],

    //<------------------------------------- test ----------------------------------------->

    [
        "BscTest",
        {
            wToken: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
            plus: {
                mos: "0x3C12F82ea96c855944efe9f3aC4ce18449Aa634B",
                fee: {
                    receiver: "0xCBdb1Da4f99276b0c427776BDE93838Bc19386Cc",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "100000000",
                },
            },
            plusV2: {
                bridge: "0x3C12F82ea96c855944efe9f3aC4ce18449Aa634B",
                fee: {
                    receiver: "0xCBdb1Da4f99276b0c427776BDE93838Bc19386Cc",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: [
                "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
                "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
                "0x6710b000cc6728e068C095B66535E1A8b552e816",
            ],
        },
    ],

    [
        "Makalu",
        {
            wToken: "0x2eD27dF9B4c903aB53666CcA59AFB431F7D15e91",
            plus: {
                mos: "0x3D8da6f43e35E05162d874BdaF93f61995A34D81",
                fee: {
                    receiver: "0xCBdb1Da4f99276b0c427776BDE93838Bc19386Cc",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "100000000",
                },
            },
            plusV2: {
                bridge: "0x3D8da6f43e35E05162d874BdaF93f61995A34D81",
                fee: {
                    receiver: "0xCBdb1Da4f99276b0c427776BDE93838Bc19386Cc",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: ["0xf479BD49E55cf47474056Ef168B0E0709DDF1830"],
        },
    ],

    [
        "zkSyncTest",
        {
            wToken: "0x20b28B1e4665FFf290650586ad76E977EAb90c5D",
            plus: {
                mos: "0x20b28B1e4665FFf290650586ad76E977EAb90c5D",
                fee: {
                    receiver: "0xCBdb1Da4f99276b0c427776BDE93838Bc19386Cc",
                    feeRate: "7000", //denominator is 1000000
                    fixedFee: "1000000000000000000",
                },
            },
            plusV2: {
                bridge: "0x20b28B1e4665FFf290650586ad76E977EAb90c5D",
                fee: {
                    receiver: "0xCBdb1Da4f99276b0c427776BDE93838Bc19386Cc",
                    feeRate: "7000", //denominator is 1000000
                },
            },
            executors: ["0x3dBe031355BDdECD4D70673A80b708a73D157814"],
        },
    ],
]);

exports.getConfig = function (network) {
    return config.get(network);
};
