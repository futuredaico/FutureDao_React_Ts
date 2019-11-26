export default {
  "contractName": "AppManager",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "removeWhiteList",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "dateTime",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "changeOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "EMPTY_PARAM_HASH",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "addWhiteList",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "bool_isInit",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "grantor",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "app",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "vData",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "paramsHash",
          "type": "bytes32"
        }
      ],
      "name": "OnAddPermission",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "newGrantor",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "app",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "vData",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "paramsHash",
          "type": "bytes32"
        }
      ],
      "name": "OnChangePermission",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "grantor",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "app",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "vData",
          "type": "bytes32"
        }
      ],
      "name": "OnDeletePermission",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tradeFundPool",
          "type": "address"
        },
        {
          "name": "_governShareManager",
          "type": "address"
        },
        {
          "name": "_fdToken",
          "type": "address"
        },
        {
          "name": "_dateTime",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getGovernShareManager",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTradeFundPool",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getFdToken",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getDateTime",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_grantor",
          "type": "address"
        },
        {
          "name": "_app",
          "type": "address"
        },
        {
          "name": "_vData",
          "type": "bytes32"
        }
      ],
      "name": "addPermission",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_grantor",
          "type": "address"
        },
        {
          "name": "_app",
          "type": "address"
        },
        {
          "name": "_vData",
          "type": "bytes32"
        },
        {
          "name": "_paramsHash",
          "type": "bytes32"
        }
      ],
      "name": "addPermission",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newGrantor",
          "type": "address"
        },
        {
          "name": "_app",
          "type": "address"
        },
        {
          "name": "_vData",
          "type": "bytes32"
        },
        {
          "name": "_paramsHash",
          "type": "bytes32"
        }
      ],
      "name": "changePermission",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newGrantor",
          "type": "address"
        },
        {
          "name": "_app",
          "type": "address"
        },
        {
          "name": "_vData",
          "type": "bytes32"
        }
      ],
      "name": "changePermission",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_grantor",
          "type": "address"
        },
        {
          "name": "_app",
          "type": "address"
        },
        {
          "name": "_vData",
          "type": "bytes32"
        }
      ],
      "name": "deletePermission",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_grantor",
          "type": "address"
        },
        {
          "name": "_app",
          "type": "address"
        },
        {
          "name": "_vData",
          "type": "bytes32"
        },
        {
          "name": "_paramsHash",
          "type": "bytes32"
        }
      ],
      "name": "verifyPermission",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.5.8+commit.23d335f2\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"constant\":false,\"inputs\":[{\"name\":\"_newGrantor\",\"type\":\"address\"},{\"name\":\"_app\",\"type\":\"address\"},{\"name\":\"_vData\",\"type\":\"bytes32\"}],\"name\":\"changePermission\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newGrantor\",\"type\":\"address\"},{\"name\":\"_app\",\"type\":\"address\"},{\"name\":\"_vData\",\"type\":\"bytes32\"},{\"name\":\"_paramsHash\",\"type\":\"bytes32\"}],\"name\":\"changePermission\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"removeWhiteList\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"dateTime\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_grantor\",\"type\":\"address\"},{\"name\":\"_app\",\"type\":\"address\"},{\"name\":\"_vData\",\"type\":\"bytes32\"},{\"name\":\"_paramsHash\",\"type\":\"bytes32\"}],\"name\":\"verifyPermission\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getFdToken\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getTradeFundPool\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_grantor\",\"type\":\"address\"},{\"name\":\"_app\",\"type\":\"address\"},{\"name\":\"_vData\",\"type\":\"bytes32\"}],\"name\":\"deletePermission\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newOwner\",\"type\":\"address\"}],\"name\":\"changeOwner\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_grantor\",\"type\":\"address\"},{\"name\":\"_app\",\"type\":\"address\"},{\"name\":\"_vData\",\"type\":\"bytes32\"},{\"name\":\"_paramsHash\",\"type\":\"bytes32\"}],\"name\":\"addPermission\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getDateTime\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getGovernShareManager\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"EMPTY_PARAM_HASH\",\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"addWhiteList\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"bool_isInit\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_grantor\",\"type\":\"address\"},{\"name\":\"_app\",\"type\":\"address\"},{\"name\":\"_vData\",\"type\":\"bytes32\"}],\"name\":\"addPermission\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_tradeFundPool\",\"type\":\"address\"},{\"name\":\"_governShareManager\",\"type\":\"address\"},{\"name\":\"_fdToken\",\"type\":\"address\"},{\"name\":\"_dateTime\",\"type\":\"address\"}],\"name\":\"initialize\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"grantor\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"app\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"vData\",\"type\":\"bytes32\"},{\"indexed\":false,\"name\":\"paramsHash\",\"type\":\"bytes32\"}],\"name\":\"OnAddPermission\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"newGrantor\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"app\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"vData\",\"type\":\"bytes32\"},{\"indexed\":false,\"name\":\"paramsHash\",\"type\":\"bytes32\"}],\"name\":\"OnChangePermission\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"grantor\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"app\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"vData\",\"type\":\"bytes32\"}],\"name\":\"OnDeletePermission\",\"type\":\"event\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"/D/_______work/FD_Contract_ETH/fd/contracts/apps/AppManager.sol\":\"AppManager\"},\"evmVersion\":\"petersburg\",\"libraries\":{},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"/D/_______work/FD_Contract_ETH/fd/contracts/Interface/IGovernShareManager.sol\":{\"keccak256\":\"0xc50bdd948693bf6775ce7f13818a41230703f60ec12f351e6de10c45192d81d7\",\"urls\":[\"bzzr://41cb941cb994db43c57f228d4e3e128a4a80cd8219bd70a63b134a8c6330a9dd\"]},\"/D/_______work/FD_Contract_ETH/fd/contracts/Interface/IPermission.sol\":{\"keccak256\":\"0x5edb0fdddd2c0e9f21e9f6ae0b80cc2a14a2d59b669d48e5861fb05c69d1501d\",\"urls\":[\"bzzr://8b09ac58ddb3f3bc3b542b6ebde56277085e88b547dd87c07306512a22dbe3b6\"]},\"/D/_______work/FD_Contract_ETH/fd/contracts/Interface/ITradeFundPool.sol\":{\"keccak256\":\"0x09deecb2adebbc741af231d5b0d7e02bc1e9c2995061fd6c74f31374fab4ce35\",\"urls\":[\"bzzr://d135c73d1becc06199341ba9b3836e9a02fa0016cfabec89540c8ea707b6bc6b\"]},\"/D/_______work/FD_Contract_ETH/fd/contracts/Own/Own.sol\":{\"keccak256\":\"0x823e0fc0618cb9ef403265b4da3ab57963d090f565885bb10fd79721eed3a1ef\",\"urls\":[\"bzzr://ba3675ddb1a729b3d5b64154197960be495782ab0ca6fb4594a41242f770dc2c\"]},\"/D/_______work/FD_Contract_ETH/fd/contracts/Permission/Permission.sol\":{\"keccak256\":\"0xc5438233fcefc62cb1f633f88d6df71aebb2737730d63634de4695962b0d621e\",\"urls\":[\"bzzr://4911d9cecf0fbe0c9036bed986377f9268d6035c7191301c700df024eef891d6\"]},\"/D/_______work/FD_Contract_ETH/fd/contracts/apps/AppManager.sol\":{\"keccak256\":\"0x1d151b90dd1bebfa2346f898b284109ee1bcc8ddcc71b30fe889e7ba61c2862f\",\"urls\":[\"bzzr://173bdf932ee96c7d5b9595779256d62b3758c1cb1bbda00e3ef3438bf5c5d455\"]}},\"version\":1}",
  "bytecode": "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506040516100d590610137565b604051809103906000f0801580156100f1573d6000803e3d6000fd5b50600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610145565b611183806200204083390190565b611eeb80620001556000396000f3fe608060405234801561001057600080fd5b50600436106101155760003560e01c8063a6f9dae1116100a2578063c513f66e11610071578063c513f66e146105ba578063e7cd4a04146105d8578063eed329fa1461061c578063f376124f1461063e578063f8c8765e146106ac57610115565b8063a6f9dae11461046a578063a945c836146104ae578063aa7547db14610526578063bf7b00eb1461057057610115565b80634c5f0749116100e95780634c5f07491461028e57806357b7ac8f1461031e578063783672e314610368578063811be92f146103b25780638da5cb5b1461042057610115565b806212b8761461011a57806306e4cd5a146101885780632042e5c21461020057806348c8cd4114610244575b600080fd5b6101866004803603606081101561013057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610750565b005b6101fe6004803603608081101561019e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019092919050505061096b565b005b6102426004803603602081101561021657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b6c565b005b61024c610c8b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610304600480360360808110156102a457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050610cb1565b604051808215151515815260200191505060405180910390f35b610326610ddb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610370610ec9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61041e600480360360608110156103c857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610fb7565b005b610428611234565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104ac6004803603602081101561048057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611259565b005b610524600480360360808110156104c457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050611402565b005b61052e611693565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610578611781565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105c261186f565b6040518082815260200191505060405180910390f35b61061a600480360360208110156105ee57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611896565b005b6106246119b4565b604051808215151515815260200191505060405180910390f35b6106aa6004803603606081101561065457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506119c7565b005b61074e600480360360808110156106c257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611c72565b005b60011515600660149054906101000a900460ff161515146107b4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dcad324f338585856040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001945050505050600060405180830381600087803b1580156108c557600080fd5b505af11580156108d9573d6000803e3d6000fd5b50505050808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f9f8ffb7f7efc086ea41d7e83c5172f5e837b5c7709182140d97214202467657b7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b6040518082815260200191505060405180910390a4505050565b60011515600660149054906101000a900460ff161515146109cf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635f473c3633868686866040518663ffffffff1660e01b8152600401808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815260200195505050505050600060405180830381600087803b158015610ae857600080fd5b505af1158015610afc573d6000803e3d6000fd5b50505050818373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f9f8ffb7f7efc086ea41d7e83c5172f5e837b5c7709182140d97214202467657b846040518082815260200191505060405180910390a450505050565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610c2f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634c5f0749868686866040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815260200194505050505060206040518083038186803b158015610d9657600080fd5b505afa158015610daa573d6000803e3d6000fd5b505050506040513d6020811015610dc057600080fd5b81019080805190602001909291905050509050949350505050565b60008073ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610ea1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f54686520616464726573732063616e6e6f7420626520656d707479000000000081525060200191505060405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610f8f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f54686520616464726573732063616e6e6f7420626520656d707479000000000081525060200191505060405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60011515600660149054906101000a900460ff1615151461101b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146110de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663811be92f8585856040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b1580156111bb57600080fd5b505af11580156111cf573d6000803e3d6000fd5b50505050818373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fd0c2b78d239ed225d3521e7e654a561486f3eae07bcefe8558c27b20d5a32eca60405160405180910390a450505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461131c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156113be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4e6565642061206e65772061646472657373000000000000000000000000000081525060200191505060405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60011515600660149054906101000a900460ff16151514611466576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611529576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a945c836868686866040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001945050505050600060405180830381600087803b15801561160e57600080fd5b505af1158015611622573d6000803e3d6000fd5b50505050828473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fa079ce8f46433050c376a0a8b9f8a22dd54e92aa312dce34f33d75517ee3ef30856040518082815260200191505060405180910390a45050505050565b60008073ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611759576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f54686520616464726573732063616e6e6f7420626520656d707479000000000081525060200191505060405180910390fd5b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008073ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611847576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f54686520616464726573732063616e6e6f7420626520656d707479000000000081525060200191505060405180910390fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b81565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611959576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b60018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b600660149054906101000a900460ff1681565b60011515600660149054906101000a900460ff16151514611a2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611aee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f376124f8585856040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015611bcb57600080fd5b505af1158015611bdf573d6000803e3d6000fd5b50505050818373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fa079ce8f46433050c376a0a8b9f8a22dd54e92aa312dce34f33d75517ee3ef307f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b6040518082815260200191505060405180910390a450505050565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611d35576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b60001515600660149054906101000a900460ff16151514611d99576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b84600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600660146101000a81548160ff021916908315150217905550505050505056fea165627a7a7230582017ce0177b56c315766dc0b34086663fb80d1c1a534d02b0ad84ebda9b8e345a200296080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506110b8806100cb6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063a6f9dae111610071578063a6f9dae1146102d2578063a945c83614610316578063c513f66e1461038e578063dcad324f146103ac578063e7cd4a041461043a578063f376124f1461047e576100a9565b80632042e5c2146100ae5780634c5f0749146100f25780635f473c3614610182578063811be92f1461021a5780638da5cb5b14610288575b600080fd5b6100f0600480360360208110156100c457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104ec565b005b6101686004803603608081101561010857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019092919050505061060b565b604051808215151515815260200191505060405180910390f35b610218600480360360a081101561019857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050610648565b005b6102866004803603606081101561023057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506107e8565b005b6102906108d2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610314600480360360208110156102e857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506108f7565b005b61038c6004803603608081101561032c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050610aa0565b005b610396610b8c565b6040518082815260200191505060405180910390f35b610438600480360360808110156103c257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610bb3565b005b61047c6004803603602081101561045057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d98565b005b6104ea6004803603606081101561049457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610eb6565b005b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146105af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6000816002600061061d888888610fc4565b815260200190815260200160002054141561063b5760019050610640565b600090505b949350505050565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461070b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b816002600061071b898888610fc4565b8152602001908152602001600020541461079d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260098152602001807f466f7262696464656e000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b81600260006107ad888888610fc4565b815260200190815260200160002081905550600260006107ce888787610fc4565b815260200190815260200160002060009055505050505050565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146108ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b600260006108ba868686610fc4565b81526020019081526020016000206000905550505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146109ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610a5c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4e6565642061206e65772061646472657373000000000000000000000000000081525060200191505060405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610b63576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b8160026000610b73888888610fc4565b8152602001908152602001600020819055505050505050565b7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b81565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610c76576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b60026000610ca9888787610fc4565b81526020019081526020016000205414610d2b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260098152602001807f466f7262696464656e000000000000000000000000000000000000000000000081525060200191505060405180910390fd5b7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b60026000610d5e878787610fc4565b81526020019081526020016000208190555060026000610d7f878686610fc4565b8152602001908152602001600020600090555050505050565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610e5b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b60018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610f79576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b60026000610fac878787610fc4565b81526020019081526020016000208190555050505050565b600083838360405160200180807f5045524d495353494f4e00000000000000000000000000000000000000000000815250600a018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018281526020019350505050604051602081830303815290604052805190602001209050939250505056fea165627a7a723058204606d3db18fda2d45dbd9d364e6981cb1e2338442a4ad9db9763dcdb2c921d9f0029",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101155760003560e01c8063a6f9dae1116100a2578063c513f66e11610071578063c513f66e146105ba578063e7cd4a04146105d8578063eed329fa1461061c578063f376124f1461063e578063f8c8765e146106ac57610115565b8063a6f9dae11461046a578063a945c836146104ae578063aa7547db14610526578063bf7b00eb1461057057610115565b80634c5f0749116100e95780634c5f07491461028e57806357b7ac8f1461031e578063783672e314610368578063811be92f146103b25780638da5cb5b1461042057610115565b806212b8761461011a57806306e4cd5a146101885780632042e5c21461020057806348c8cd4114610244575b600080fd5b6101866004803603606081101561013057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610750565b005b6101fe6004803603608081101561019e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019092919050505061096b565b005b6102426004803603602081101561021657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b6c565b005b61024c610c8b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610304600480360360808110156102a457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050610cb1565b604051808215151515815260200191505060405180910390f35b610326610ddb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610370610ec9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61041e600480360360608110156103c857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610fb7565b005b610428611234565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104ac6004803603602081101561048057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611259565b005b610524600480360360808110156104c457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050611402565b005b61052e611693565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610578611781565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105c261186f565b6040518082815260200191505060405180910390f35b61061a600480360360208110156105ee57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611896565b005b6106246119b4565b604051808215151515815260200191505060405180910390f35b6106aa6004803603606081101561065457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506119c7565b005b61074e600480360360808110156106c257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611c72565b005b60011515600660149054906101000a900460ff161515146107b4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dcad324f338585856040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001945050505050600060405180830381600087803b1580156108c557600080fd5b505af11580156108d9573d6000803e3d6000fd5b50505050808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f9f8ffb7f7efc086ea41d7e83c5172f5e837b5c7709182140d97214202467657b7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b6040518082815260200191505060405180910390a4505050565b60011515600660149054906101000a900460ff161515146109cf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635f473c3633868686866040518663ffffffff1660e01b8152600401808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815260200195505050505050600060405180830381600087803b158015610ae857600080fd5b505af1158015610afc573d6000803e3d6000fd5b50505050818373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f9f8ffb7f7efc086ea41d7e83c5172f5e837b5c7709182140d97214202467657b846040518082815260200191505060405180910390a450505050565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610c2f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634c5f0749868686866040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815260200194505050505060206040518083038186803b158015610d9657600080fd5b505afa158015610daa573d6000803e3d6000fd5b505050506040513d6020811015610dc057600080fd5b81019080805190602001909291905050509050949350505050565b60008073ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610ea1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f54686520616464726573732063616e6e6f7420626520656d707479000000000081525060200191505060405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610f8f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f54686520616464726573732063616e6e6f7420626520656d707479000000000081525060200191505060405180910390fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60011515600660149054906101000a900460ff1615151461101b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146110de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663811be92f8585856040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b1580156111bb57600080fd5b505af11580156111cf573d6000803e3d6000fd5b50505050818373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fd0c2b78d239ed225d3521e7e654a561486f3eae07bcefe8558c27b20d5a32eca60405160405180910390a450505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461131c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156113be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4e6565642061206e65772061646472657373000000000000000000000000000081525060200191505060405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60011515600660149054906101000a900460ff16151514611466576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611529576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a945c836868686866040518563ffffffff1660e01b8152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001945050505050600060405180830381600087803b15801561160e57600080fd5b505af1158015611622573d6000803e3d6000fd5b50505050828473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fa079ce8f46433050c376a0a8b9f8a22dd54e92aa312dce34f33d75517ee3ef30856040518082815260200191505060405180910390a45050505050565b60008073ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611759576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f54686520616464726573732063616e6e6f7420626520656d707479000000000081525060200191505060405180910390fd5b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008073ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611847576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f54686520616464726573732063616e6e6f7420626520656d707479000000000081525060200191505060405180910390fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b7f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b81565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611959576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b60018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b600660149054906101000a900460ff1681565b60011515600660149054906101000a900460ff16151514611a2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611aee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f376124f8585856040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015611bcb57600080fd5b505af1158015611bdf573d6000803e3d6000fd5b50505050818373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fa079ce8f46433050c376a0a8b9f8a22dd54e92aa312dce34f33d75517ee3ef307f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56360001b6040518082815260200191505060405180910390a450505050565b336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611d35576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5065726d697373696f6e2064656e69656400000000000000000000000000000081525060200191505060405180910390fd5b60001515600660149054906101000a900460ff16151514611d99576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526000815260200160200191505060405180910390fd5b84600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600660146101000a81548160ff021916908315150217905550505050505056fea165627a7a7230582017ce0177b56c315766dc0b34086663fb80d1c1a534d02b0ad84ebda9b8e345a20029",
  "sourceMap": "197:3626:18:-;;;979:69;8:9:-1;5:2;;;30:1;27;20:12;5:2;979:69:18;175:10:11;167:5;;:18;;;;;;;;;;;;;;;;;;215:4;196:9;:16;206:5;;;;;;;;;;;196:16;;;;;;;;;;;;;;;;:23;;;;;;;;;;;;;;;;;;1024:16:18;;;;;:::i;:::-;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1024:16:18;1011:10;;:29;;;;;;;;;;;;;;;;;;197:3626;;;;;;;;;;:::o;:::-;;;;;;;",
  "deployedSourceMap": "197:3626:18:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;197:3626:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2532:250;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2532:250:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;3087:277;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;3087:277:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;588:109:11;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;588:109:11;;;;;;;;;;;;;;;;;;;:::i;:::-;;408:23:18;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;3613:207;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;3613:207:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1944:164;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1754:182;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;3372:233;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;3372:233:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;56:28:11;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;705:174;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;705:174:11;;;;;;;;;;;;;;;;;;;:::i;:::-;;2790:289:18;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;2790:289:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;2116:159;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1548:198;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;472:109;;;:::i;:::-;;;;;;;;;;;;;;;;;;;475:105:11;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;475:105:11;;;;;;;;;;;;;;;;;;;:::i;:::-;;440:23:18;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;2283:241;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2283:241:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;1144:396;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;1144:396:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;2532:250;1108:4;1093:19;;:11;;;;;;;;;;;:19;;;1085:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2635:10;;;;;;;;;;;:27;;;2663:10;2674:11;2686:4;2691:6;2635:63;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2635:63:18;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2635:63:18;;;;2750:6;2745:4;2714:60;;2733:11;2714:60;;;515:66;2757:16;;2714:60;;;;;;;;;;;;;;;;;;2532:250;;;:::o;3087:277::-;1108:4;1093:19;;:11;;;;;;;;;;;:19;;;1085:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3210:10;;;;;;;;;;;:27;;;3238:10;3249:11;3261:4;3266:6;3273:11;3210:75;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3210:75:18;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3210:75:18;;;;3337:6;3332:4;3301:55;;3320:11;3301:55;;;3344:11;3301:55;;;;;;;;;;;;;;;;;;3087:277;;;;:::o;588:109:11:-;643:10;294:5;;;;;;;;;;;285:14;;:5;:14;;;277:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;684:5;665:9;:16;675:5;665:16;;;;;;;;;;;;;;;;:24;;;;;;;;;;;;;;;;;;588:109;;:::o;408:23:18:-;;;;;;;;;;;;;:::o;3613:207::-;3728:4;3751:10;;;;;;;;;;;:27;;;3779:8;3788:4;3793:6;3800:11;3751:61;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3751:61:18;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3751:61:18;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;3751:61:18;;;;;;;;;;;;;;;;3744:68;;3613:207;;;;;;:::o;1944:164::-;1988:15;2042:1;2023:21;;:7;;;;;;;;;;;:21;;;;2015:60;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2093:7;;;;;;;;;;;2086:14;;1944:164;:::o;1754:182::-;1804:15;1864:1;1839:27;;:13;;;;;;;;;;;:27;;;;1831:66;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1915:13;;;;;;;;;;;1908:20;;1754:182;:::o;3372:233::-;1108:4;1093:19;;:11;;;;;;;;;;;:19;;;1085:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3470:10;294:5:11;;;;;;;;;;;285:14;;:5;:14;;;277:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3492:10:18;;;;;;;;;;;:27;;;3520:8;3529:4;3534:6;3492:49;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3492:49:18;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3492:49:18;;;;3590:6;3585:4;3557:40;;3576:8;3557:40;;;;;;;;;;;;1127:1;3372:233;;;:::o;56:28:11:-;;;;;;;;;;;;;:::o;705:174::-;768:10;294:5;;;;;;;;;;;285:14;;:5;:14;;;277:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;812:9;798:23;;:10;:23;;;;790:53;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;862:9;854:5;;:17;;;;;;;;;;;;;;;;;;705:174;;:::o;2790:289:18:-;1108:4;1093:19;;:11;;;;;;;;;;;:19;;;1085:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2920:10;294:5:11;;;;;;;;;;;285:14;;:5;:14;;;277:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2948:10:18;;;;;;;;;;;:24;;;2973:8;2982:4;2987:6;2994:11;2948:58;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2948:58:18;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2948:58:18;;;;3052:6;3047:4;3022:49;;3038:8;3022:49;;;3059:11;3022:49;;;;;;;;;;;;;;;;;;1127:1;2790:289;;;;:::o;2116:159::-;2161:7;2208:1;2188:22;;:8;;;;;;;;;;;:22;;;;2180:61;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2259:8;;;;;;;;;;;2252:15;;2116:159;:::o;1548:198::-;1603:15;1669:1;1639:32;;:18;;;;;;;;;;;:32;;;;1631:71;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1720:18;;;;;;;;;;;1713:25;;1548:198;:::o;472:109::-;515:66;472:109;;;:::o;475:105:11:-;527:10;294:5;;;;;;;;;;;285:14;;:5;:14;;;277:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;568:4;549:9;:16;559:5;549:16;;;;;;;;;;;;;;;;:23;;;;;;;;;;;;;;;;;;475:105;;:::o;440:23:18:-;;;;;;;;;;;;;:::o;2283:241::-;1108:4;1093:19;;:11;;;;;;;;;;;:19;;;1085:31;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2378:10;294:5:11;;;;;;;;;;;285:14;;:5;:14;;;277:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2400:10:18;;;;;;;;;;;:24;;;2425:8;2434:4;2439:6;2400:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2400:46:18;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2400:46:18;;;;2492:6;2487:4;2462:54;;2478:8;2462:54;;;515:66;2499:16;;2462:54;;;;;;;;;;;;;;;;;;1127:1;2283:241;;;:::o;1144:396::-;1297:10;294:5:11;;;;;;;;;;;285:14;;:5;:14;;;277:43;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1342:5:18;1327:20;;:11;;;;;;;;;;;:20;;;1319:32;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1378:14;1362:13;;:30;;;;;;;;;;;;;;;;;;1424:19;1403:18;;:40;;;;;;;;;;;;;;;;;;1464:8;1454:7;;:18;;;;;;;;;;;;;;;;;;1494:9;1483:8;;:20;;;;;;;;;;;;;;;;;;1528:4;1514:11;;:18;;;;;;;;;;;;;;;;;;1144:396;;;;;:::o",
  "source": "pragma solidity >=0.4.22 <0.6.0;\r\n\r\nimport \"../Permission/Permission.sol\";\r\nimport \"../Own/Own.sol\";\r\nimport \"../Interface/IGovernShareManager.sol\";\r\nimport \"../Interface/ITradeFundPool.sol\";\r\n\r\n\r\ncontract AppManager is Own{\r\n\r\n    IPermission private permission;\r\n\r\n    address payable private tradeFundPool;\r\n\r\n    address payable private governShareManager;\r\n\r\n    address payable private fdToken;\r\n\r\n    address public dateTime;\r\n\r\n    bool public bool_isInit;\r\n\r\n    bytes32 public constant EMPTY_PARAM_HASH = 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563;\r\n\r\n    event OnAddPermission(address indexed grantor, address indexed app, bytes32 indexed vData, bytes32 paramsHash);\r\n\r\n    event OnChangePermission(\r\n        address indexed newGrantor,\r\n        address indexed app,\r\n        bytes32 indexed vData,\r\n        bytes32 paramsHash\r\n    );\r\n\r\n    event OnDeletePermission(address indexed grantor, address indexed app, bytes32 indexed vData);\r\n\r\n    constructor() public {\r\n        permission = new Permission();\r\n    }\r\n\r\n    modifier isInit() {\r\n        require(bool_isInit == true,\"\");\r\n        _;\r\n    }\r\n\r\n    function initialize(address payable _tradeFundPool,address payable _governShareManager,address payable _fdToken,address _dateTime)\r\n    external isOwner(msg.sender){\r\n        require(bool_isInit == false,\"\");\r\n        tradeFundPool = _tradeFundPool;\r\n        governShareManager = _governShareManager;\r\n        fdToken = _fdToken;\r\n        dateTime = _dateTime;\r\n        bool_isInit = true;\r\n    }\r\n\r\n    function getGovernShareManager() external view returns(address payable) {\r\n        require(governShareManager != address(0),\"The address cannot be empty\");\r\n        return governShareManager;\r\n    }\r\n\r\n    function getTradeFundPool() external view returns(address payable){\r\n        require(tradeFundPool != address(0),\"The address cannot be empty\");\r\n        return tradeFundPool;\r\n    }\r\n\r\n    function getFdToken() external view returns(address payable){\r\n        require(fdToken != address(0),\"The address cannot be empty\");\r\n        return fdToken;\r\n    }\r\n\r\n    function getDateTime() external view returns(address){\r\n        require(dateTime != address(0),\"The address cannot be empty\");\r\n        return dateTime;\r\n    }\r\n\r\n    function addPermission(address _grantor,address _app,bytes32 _vData) external isInit() isOwner(msg.sender){\r\n        permission.addPermission(_grantor,_app,_vData);\r\n        emit OnAddPermission(_grantor,_app,_vData,EMPTY_PARAM_HASH);\r\n    }\r\n\r\n    function changePermission(address _newGrantor,address _app,bytes32 _vData) external isInit(){\r\n        permission.changePermission(msg.sender,_newGrantor,_app,_vData);\r\n        emit OnChangePermission(_newGrantor,_app,_vData,EMPTY_PARAM_HASH);\r\n    }\r\n\r\n    function addPermission(address _grantor,address _app,bytes32 _vData,bytes32 _paramsHash)\r\n    external\r\n    isInit()\r\n    isOwner(msg.sender)\r\n    {\r\n        permission.addPermission(_grantor,_app,_vData,_paramsHash);\r\n        emit OnAddPermission(_grantor,_app,_vData,_paramsHash);\r\n    }\r\n\r\n    function changePermission(address _newGrantor,address _app,bytes32 _vData,bytes32 _paramsHash) external isInit(){\r\n        permission.changePermission(msg.sender,_newGrantor,_app,_vData,_paramsHash);\r\n        emit OnChangePermission(_newGrantor,_app,_vData,_paramsHash);\r\n    }\r\n\r\n    function deletePermission(address _grantor,address _app,bytes32 _vData) external isInit() isOwner(msg.sender){\r\n        permission.deletePermission(_grantor,_app,_vData);\r\n        emit OnDeletePermission(_grantor,_app,_vData);\r\n    }\r\n\r\n    function verifyPermission(address _grantor,address _app,bytes32 _vData,bytes32 _paramsHash) external view returns (bool){\r\n        return permission.verifyPermission(_grantor,_app,_vData,_paramsHash);\r\n    }\r\n}",
  "sourcePath": "D:\\_______work\\FD_Contract_ETH\\fd\\contracts\\apps\\AppManager.sol",
  "ast": {
    "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/apps/AppManager.sol",
    "exportedSymbols": {
      "AppManager": [
        5567
      ]
    },
    "id": 5568,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5207,
        "literals": [
          "solidity",
          ">=",
          "0.4",
          ".22",
          "<",
          "0.6",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:32:18"
      },
      {
        "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/Permission/Permission.sol",
        "file": "../Permission/Permission.sol",
        "id": 5208,
        "nodeType": "ImportDirective",
        "scope": 5568,
        "sourceUnit": 2935,
        "src": "36:38:18",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/Own/Own.sol",
        "file": "../Own/Own.sol",
        "id": 5209,
        "nodeType": "ImportDirective",
        "scope": 5568,
        "sourceUnit": 2696,
        "src": "76:24:18",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/Interface/IGovernShareManager.sol",
        "file": "../Interface/IGovernShareManager.sol",
        "id": 5210,
        "nodeType": "ImportDirective",
        "scope": 5568,
        "sourceUnit": 2411,
        "src": "102:46:18",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/Interface/ITradeFundPool.sol",
        "file": "../Interface/ITradeFundPool.sol",
        "id": 5211,
        "nodeType": "ImportDirective",
        "scope": 5568,
        "sourceUnit": 2533,
        "src": "150:41:18",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5212,
              "name": "Own",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2695,
              "src": "220:3:18",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Own_$2695",
                "typeString": "contract Own"
              }
            },
            "id": 5213,
            "nodeType": "InheritanceSpecifier",
            "src": "220:3:18"
          }
        ],
        "contractDependencies": [
          2695,
          2934
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 5567,
        "linearizedBaseContracts": [
          5567,
          2695
        ],
        "name": "AppManager",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 5215,
            "name": "permission",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "232:30:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_IPermission_$2479",
              "typeString": "contract IPermission"
            },
            "typeName": {
              "contractScope": null,
              "id": 5214,
              "name": "IPermission",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2479,
              "src": "232:11:18",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IPermission_$2479",
                "typeString": "contract IPermission"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 5217,
            "name": "tradeFundPool",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "271:37:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address_payable",
              "typeString": "address payable"
            },
            "typeName": {
              "id": 5216,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "271:15:18",
              "stateMutability": "payable",
              "typeDescriptions": {
                "typeIdentifier": "t_address_payable",
                "typeString": "address payable"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 5219,
            "name": "governShareManager",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "317:42:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address_payable",
              "typeString": "address payable"
            },
            "typeName": {
              "id": 5218,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "317:15:18",
              "stateMutability": "payable",
              "typeDescriptions": {
                "typeIdentifier": "t_address_payable",
                "typeString": "address payable"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 5221,
            "name": "fdToken",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "368:31:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address_payable",
              "typeString": "address payable"
            },
            "typeName": {
              "id": 5220,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "368:15:18",
              "stateMutability": "payable",
              "typeDescriptions": {
                "typeIdentifier": "t_address_payable",
                "typeString": "address payable"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 5223,
            "name": "dateTime",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "408:23:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 5222,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "408:7:18",
              "stateMutability": "nonpayable",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 5225,
            "name": "bool_isInit",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "440:23:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bool",
              "typeString": "bool"
            },
            "typeName": {
              "id": 5224,
              "name": "bool",
              "nodeType": "ElementaryTypeName",
              "src": "440:4:18",
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": true,
            "id": 5228,
            "name": "EMPTY_PARAM_HASH",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "472:109:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes32",
              "typeString": "bytes32"
            },
            "typeName": {
              "id": 5226,
              "name": "bytes32",
              "nodeType": "ElementaryTypeName",
              "src": "472:7:18",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes32",
                "typeString": "bytes32"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "307832393064656364393534386236326138643630333435613938383338366663383462613662633935343834303038663633363266393331363065663365353633",
              "id": 5227,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "515:66:18",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_18569430475105882587588266137607568536673111973893317399460219858819262702947_by_1",
                "typeString": "int_const 1856...(69 digits omitted)...2947"
              },
              "value": "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
            },
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5238,
            "name": "OnAddPermission",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5237,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5230,
                  "indexed": true,
                  "name": "grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5238,
                  "src": "612:23:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5229,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "612:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5232,
                  "indexed": true,
                  "name": "app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5238,
                  "src": "637:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5231,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "637:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5234,
                  "indexed": true,
                  "name": "vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5238,
                  "src": "658:21:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5233,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "658:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5236,
                  "indexed": false,
                  "name": "paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5238,
                  "src": "681:18:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5235,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "681:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "611:89:18"
            },
            "src": "590:111:18"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5248,
            "name": "OnChangePermission",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5247,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5240,
                  "indexed": true,
                  "name": "newGrantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5248,
                  "src": "744:26:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5239,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "744:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5242,
                  "indexed": true,
                  "name": "app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5248,
                  "src": "781:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5241,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "781:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5244,
                  "indexed": true,
                  "name": "vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5248,
                  "src": "811:21:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5243,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "811:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5246,
                  "indexed": false,
                  "name": "paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5248,
                  "src": "843:18:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5245,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "843:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "733:135:18"
            },
            "src": "709:160:18"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5256,
            "name": "OnDeletePermission",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5255,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5250,
                  "indexed": true,
                  "name": "grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5256,
                  "src": "902:23:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5249,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "902:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5252,
                  "indexed": true,
                  "name": "app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5256,
                  "src": "927:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5251,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "927:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5254,
                  "indexed": true,
                  "name": "vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5256,
                  "src": "948:21:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5253,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "948:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "901:69:18"
            },
            "src": "877:94:18"
          },
          {
            "body": {
              "id": 5265,
              "nodeType": "Block",
              "src": "1000:48:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5263,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5259,
                      "name": "permission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5215,
                      "src": "1011:10:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IPermission_$2479",
                        "typeString": "contract IPermission"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [],
                      "expression": {
                        "argumentTypes": [],
                        "id": 5261,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "1024:14:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_creation_nonpayable$__$returns$_t_contract$_Permission_$2934_$",
                          "typeString": "function () returns (contract Permission)"
                        },
                        "typeName": {
                          "contractScope": null,
                          "id": 5260,
                          "name": "Permission",
                          "nodeType": "UserDefinedTypeName",
                          "referencedDeclaration": 2934,
                          "src": "1028:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_contract$_Permission_$2934",
                            "typeString": "contract Permission"
                          }
                        }
                      },
                      "id": 5262,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1024:16:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Permission_$2934",
                        "typeString": "contract Permission"
                      }
                    },
                    "src": "1011:29:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IPermission_$2479",
                      "typeString": "contract IPermission"
                    }
                  },
                  "id": 5264,
                  "nodeType": "ExpressionStatement",
                  "src": "1011:29:18"
                }
              ]
            },
            "documentation": null,
            "id": 5266,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5257,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "990:2:18"
            },
            "returnParameters": {
              "id": 5258,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1000:0:18"
            },
            "scope": 5567,
            "src": "979:69:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5276,
              "nodeType": "Block",
              "src": "1074:62:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 5271,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5269,
                          "name": "bool_isInit",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5225,
                          "src": "1093:11:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "74727565",
                          "id": 5270,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "bool",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1108:4:18",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          "value": "true"
                        },
                        "src": "1093:19:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "",
                        "id": 5272,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1113:2:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                          "typeString": "literal_string \"\""
                        },
                        "value": ""
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                          "typeString": "literal_string \"\""
                        }
                      ],
                      "id": 5268,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "1085:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5273,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1085:31:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5274,
                  "nodeType": "ExpressionStatement",
                  "src": "1085:31:18"
                },
                {
                  "id": 5275,
                  "nodeType": "PlaceholderStatement",
                  "src": "1127:1:18"
                }
              ]
            },
            "documentation": null,
            "id": 5277,
            "name": "isInit",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 5267,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1071:2:18"
            },
            "src": "1056:80:18",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5319,
              "nodeType": "Block",
              "src": "1308:232:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 5295,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5293,
                          "name": "bool_isInit",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5225,
                          "src": "1327:11:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "66616c7365",
                          "id": 5294,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "bool",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1342:5:18",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          "value": "false"
                        },
                        "src": "1327:20:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "",
                        "id": 5296,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1348:2:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                          "typeString": "literal_string \"\""
                        },
                        "value": ""
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                          "typeString": "literal_string \"\""
                        }
                      ],
                      "id": 5292,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "1319:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5297,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1319:32:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5298,
                  "nodeType": "ExpressionStatement",
                  "src": "1319:32:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5301,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5299,
                      "name": "tradeFundPool",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5217,
                      "src": "1362:13:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5300,
                      "name": "_tradeFundPool",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5279,
                      "src": "1378:14:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "1362:30:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "id": 5302,
                  "nodeType": "ExpressionStatement",
                  "src": "1362:30:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5305,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5303,
                      "name": "governShareManager",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5219,
                      "src": "1403:18:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5304,
                      "name": "_governShareManager",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5281,
                      "src": "1424:19:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "1403:40:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "id": 5306,
                  "nodeType": "ExpressionStatement",
                  "src": "1403:40:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5309,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5307,
                      "name": "fdToken",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5221,
                      "src": "1454:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5308,
                      "name": "_fdToken",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5283,
                      "src": "1464:8:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "1454:18:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "id": 5310,
                  "nodeType": "ExpressionStatement",
                  "src": "1454:18:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5313,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5311,
                      "name": "dateTime",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5223,
                      "src": "1483:8:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5312,
                      "name": "_dateTime",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5285,
                      "src": "1494:9:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1483:20:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 5314,
                  "nodeType": "ExpressionStatement",
                  "src": "1483:20:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5317,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5315,
                      "name": "bool_isInit",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5225,
                      "src": "1514:11:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 5316,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1528:4:18",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "1514:18:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 5318,
                  "nodeType": "ExpressionStatement",
                  "src": "1514:18:18"
                }
              ]
            },
            "documentation": null,
            "id": 5320,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 5288,
                      "name": "msg",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7142,
                      "src": "1297:3:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_message",
                        "typeString": "msg"
                      }
                    },
                    "id": 5289,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "sender",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "1297:10:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  }
                ],
                "id": 5290,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5287,
                  "name": "isOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2625,
                  "src": "1289:7:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1289:19:18"
              }
            ],
            "name": "initialize",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5286,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5279,
                  "name": "_tradeFundPool",
                  "nodeType": "VariableDeclaration",
                  "scope": 5320,
                  "src": "1164:30:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5278,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1164:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5281,
                  "name": "_governShareManager",
                  "nodeType": "VariableDeclaration",
                  "scope": 5320,
                  "src": "1195:35:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5280,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1195:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5283,
                  "name": "_fdToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 5320,
                  "src": "1231:24:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5282,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1231:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5285,
                  "name": "_dateTime",
                  "nodeType": "VariableDeclaration",
                  "scope": 5320,
                  "src": "1256:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5284,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1256:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1163:111:18"
            },
            "returnParameters": {
              "id": 5291,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1308:0:18"
            },
            "scope": 5567,
            "src": "1144:396:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5336,
              "nodeType": "Block",
              "src": "1620:126:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "id": 5330,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5326,
                          "name": "governShareManager",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5219,
                          "src": "1639:18:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 5328,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1669:1:18",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 5327,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1661:7:18",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 5329,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1661:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1639:32:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "54686520616464726573732063616e6e6f7420626520656d707479",
                        "id": 5331,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1672:29:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        },
                        "value": "The address cannot be empty"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        }
                      ],
                      "id": 5325,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "1631:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5332,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1631:71:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5333,
                  "nodeType": "ExpressionStatement",
                  "src": "1631:71:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5334,
                    "name": "governShareManager",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5219,
                    "src": "1720:18:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "functionReturnParameters": 5324,
                  "id": 5335,
                  "nodeType": "Return",
                  "src": "1713:25:18"
                }
              ]
            },
            "documentation": null,
            "id": 5337,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "getGovernShareManager",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5321,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1578:2:18"
            },
            "returnParameters": {
              "id": 5324,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5323,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5337,
                  "src": "1603:15:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5322,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1603:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1602:17:18"
            },
            "scope": 5567,
            "src": "1548:198:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5353,
              "nodeType": "Block",
              "src": "1820:116:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "id": 5347,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5343,
                          "name": "tradeFundPool",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5217,
                          "src": "1839:13:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 5345,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1864:1:18",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 5344,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1856:7:18",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 5346,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1856:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1839:27:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "54686520616464726573732063616e6e6f7420626520656d707479",
                        "id": 5348,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1867:29:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        },
                        "value": "The address cannot be empty"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        }
                      ],
                      "id": 5342,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "1831:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5349,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1831:66:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5350,
                  "nodeType": "ExpressionStatement",
                  "src": "1831:66:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5351,
                    "name": "tradeFundPool",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5217,
                    "src": "1915:13:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "functionReturnParameters": 5341,
                  "id": 5352,
                  "nodeType": "Return",
                  "src": "1908:20:18"
                }
              ]
            },
            "documentation": null,
            "id": 5354,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "getTradeFundPool",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5338,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1779:2:18"
            },
            "returnParameters": {
              "id": 5341,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5340,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5354,
                  "src": "1804:15:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5339,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1804:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1803:17:18"
            },
            "scope": 5567,
            "src": "1754:182:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5370,
              "nodeType": "Block",
              "src": "2004:104:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "id": 5364,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5360,
                          "name": "fdToken",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5221,
                          "src": "2023:7:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 5362,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2042:1:18",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 5361,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "2034:7:18",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 5363,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2034:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "2023:21:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "54686520616464726573732063616e6e6f7420626520656d707479",
                        "id": 5365,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2045:29:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        },
                        "value": "The address cannot be empty"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        }
                      ],
                      "id": 5359,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "2015:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5366,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2015:60:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5367,
                  "nodeType": "ExpressionStatement",
                  "src": "2015:60:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5368,
                    "name": "fdToken",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5221,
                    "src": "2093:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "functionReturnParameters": 5358,
                  "id": 5369,
                  "nodeType": "Return",
                  "src": "2086:14:18"
                }
              ]
            },
            "documentation": null,
            "id": 5371,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "getFdToken",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5355,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1963:2:18"
            },
            "returnParameters": {
              "id": 5358,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5357,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5371,
                  "src": "1988:15:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5356,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1988:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1987:17:18"
            },
            "scope": 5567,
            "src": "1944:164:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5387,
              "nodeType": "Block",
              "src": "2169:106:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 5381,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5377,
                          "name": "dateTime",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5223,
                          "src": "2188:8:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 5379,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2208:1:18",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 5378,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "2200:7:18",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 5380,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2200:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "2188:22:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "54686520616464726573732063616e6e6f7420626520656d707479",
                        "id": 5382,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2211:29:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        },
                        "value": "The address cannot be empty"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        }
                      ],
                      "id": 5376,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "2180:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5383,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2180:61:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5384,
                  "nodeType": "ExpressionStatement",
                  "src": "2180:61:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5385,
                    "name": "dateTime",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5223,
                    "src": "2259:8:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 5375,
                  "id": 5386,
                  "nodeType": "Return",
                  "src": "2252:15:18"
                }
              ]
            },
            "documentation": null,
            "id": 5388,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "getDateTime",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5372,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2136:2:18"
            },
            "returnParameters": {
              "id": 5375,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5374,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5388,
                  "src": "2161:7:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5373,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2161:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2160:9:18"
            },
            "scope": 5567,
            "src": "2116:159:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5418,
              "nodeType": "Block",
              "src": "2389:135:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5406,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5390,
                        "src": "2425:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5407,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5392,
                        "src": "2434:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5408,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5394,
                        "src": "2439:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5403,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "2400:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5405,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "addPermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2421,
                      "src": "2400:24:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32) external"
                      }
                    },
                    "id": 5409,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2400:46:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5410,
                  "nodeType": "ExpressionStatement",
                  "src": "2400:46:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5412,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5390,
                        "src": "2478:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5413,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5392,
                        "src": "2487:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5414,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5394,
                        "src": "2492:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5415,
                        "name": "EMPTY_PARAM_HASH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5228,
                        "src": "2499:16:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5411,
                      "name": "OnAddPermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5238,
                      "src": "2462:15:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32)"
                      }
                    },
                    "id": 5416,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2462:54:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5417,
                  "nodeType": "EmitStatement",
                  "src": "2457:59:18"
                }
              ]
            },
            "documentation": null,
            "id": 5419,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5397,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5396,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "2361:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2361:8:18"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 5399,
                      "name": "msg",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7142,
                      "src": "2378:3:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_message",
                        "typeString": "msg"
                      }
                    },
                    "id": 5400,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "sender",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "2378:10:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  }
                ],
                "id": 5401,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5398,
                  "name": "isOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2625,
                  "src": "2370:7:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2370:19:18"
              }
            ],
            "name": "addPermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5395,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5390,
                  "name": "_grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5419,
                  "src": "2306:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5389,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2306:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5392,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5419,
                  "src": "2323:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5391,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2323:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5394,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5419,
                  "src": "2336:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5393,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2336:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2305:46:18"
            },
            "returnParameters": {
              "id": 5402,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2389:0:18"
            },
            "scope": 5567,
            "src": "2283:241:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5447,
              "nodeType": "Block",
              "src": "2624:158:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5433,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7142,
                          "src": "2663:3:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5434,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2663:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5435,
                        "name": "_newGrantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5421,
                        "src": "2674:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5436,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5423,
                        "src": "2686:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5437,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5425,
                        "src": "2691:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5430,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "2635:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5432,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "changePermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2432,
                      "src": "2635:27:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_address_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,address,bytes32) external"
                      }
                    },
                    "id": 5438,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2635:63:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5439,
                  "nodeType": "ExpressionStatement",
                  "src": "2635:63:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5441,
                        "name": "_newGrantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5421,
                        "src": "2733:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5442,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5423,
                        "src": "2745:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5443,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5425,
                        "src": "2750:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5444,
                        "name": "EMPTY_PARAM_HASH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5228,
                        "src": "2757:16:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5440,
                      "name": "OnChangePermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5248,
                      "src": "2714:18:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32)"
                      }
                    },
                    "id": 5445,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2714:60:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5446,
                  "nodeType": "EmitStatement",
                  "src": "2709:65:18"
                }
              ]
            },
            "documentation": null,
            "id": 5448,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5428,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5427,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "2616:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2616:8:18"
              }
            ],
            "name": "changePermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5426,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5421,
                  "name": "_newGrantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5448,
                  "src": "2558:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5420,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2558:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5423,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5448,
                  "src": "2578:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5422,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2578:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5425,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5448,
                  "src": "2591:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5424,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2591:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2557:49:18"
            },
            "returnParameters": {
              "id": 5429,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2624:0:18"
            },
            "scope": 5567,
            "src": "2532:250:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5481,
              "nodeType": "Block",
              "src": "2937:142:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5468,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5450,
                        "src": "2973:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5469,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5452,
                        "src": "2982:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5470,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5454,
                        "src": "2987:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5471,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5456,
                        "src": "2994:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5465,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "2948:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5467,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "addPermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2443,
                      "src": "2948:24:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32) external"
                      }
                    },
                    "id": 5472,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2948:58:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5473,
                  "nodeType": "ExpressionStatement",
                  "src": "2948:58:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5475,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5450,
                        "src": "3038:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5476,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5452,
                        "src": "3047:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5477,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5454,
                        "src": "3052:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5478,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5456,
                        "src": "3059:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5474,
                      "name": "OnAddPermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5238,
                      "src": "3022:15:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32)"
                      }
                    },
                    "id": 5479,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3022:49:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5480,
                  "nodeType": "EmitStatement",
                  "src": "3017:54:18"
                }
              ]
            },
            "documentation": null,
            "id": 5482,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5459,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5458,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "2898:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2898:8:18"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 5461,
                      "name": "msg",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7142,
                      "src": "2920:3:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_message",
                        "typeString": "msg"
                      }
                    },
                    "id": 5462,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "sender",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "2920:10:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  }
                ],
                "id": 5463,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5460,
                  "name": "isOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2625,
                  "src": "2912:7:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2912:19:18"
              }
            ],
            "name": "addPermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5457,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5450,
                  "name": "_grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5482,
                  "src": "2813:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5449,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2813:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5452,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5482,
                  "src": "2830:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5451,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2830:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5454,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5482,
                  "src": "2843:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5453,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2843:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5456,
                  "name": "_paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5482,
                  "src": "2858:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5455,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2858:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2812:66:18"
            },
            "returnParameters": {
              "id": 5464,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2937:0:18"
            },
            "scope": 5567,
            "src": "2790:289:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5513,
              "nodeType": "Block",
              "src": "3199:165:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5498,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7142,
                          "src": "3238:3:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5499,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3238:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5500,
                        "name": "_newGrantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5484,
                        "src": "3249:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5501,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5486,
                        "src": "3261:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5502,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5488,
                        "src": "3266:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5503,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5490,
                        "src": "3273:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5495,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "3210:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5497,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "changePermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2456,
                      "src": "3210:27:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,address,bytes32,bytes32) external"
                      }
                    },
                    "id": 5504,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3210:75:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5505,
                  "nodeType": "ExpressionStatement",
                  "src": "3210:75:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5507,
                        "name": "_newGrantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5484,
                        "src": "3320:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5508,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5486,
                        "src": "3332:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5509,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5488,
                        "src": "3337:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5510,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5490,
                        "src": "3344:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5506,
                      "name": "OnChangePermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5248,
                      "src": "3301:18:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32)"
                      }
                    },
                    "id": 5511,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3301:55:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5512,
                  "nodeType": "EmitStatement",
                  "src": "3296:60:18"
                }
              ]
            },
            "documentation": null,
            "id": 5514,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5493,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5492,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "3191:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3191:8:18"
              }
            ],
            "name": "changePermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5491,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5484,
                  "name": "_newGrantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5514,
                  "src": "3113:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5483,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3113:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5486,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5514,
                  "src": "3133:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5485,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3133:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5488,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5514,
                  "src": "3146:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5487,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3146:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5490,
                  "name": "_paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5514,
                  "src": "3161:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5489,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3161:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3112:69:18"
            },
            "returnParameters": {
              "id": 5494,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3199:0:18"
            },
            "scope": 5567,
            "src": "3087:277:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5543,
              "nodeType": "Block",
              "src": "3481:124:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5532,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5516,
                        "src": "3520:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5533,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5518,
                        "src": "3529:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5534,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5520,
                        "src": "3534:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5529,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "3492:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5531,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "deletePermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2478,
                      "src": "3492:27:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32) external"
                      }
                    },
                    "id": 5535,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3492:49:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5536,
                  "nodeType": "ExpressionStatement",
                  "src": "3492:49:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5538,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5516,
                        "src": "3576:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5539,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5518,
                        "src": "3585:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5540,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5520,
                        "src": "3590:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5537,
                      "name": "OnDeletePermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5256,
                      "src": "3557:18:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32)"
                      }
                    },
                    "id": 5541,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3557:40:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5542,
                  "nodeType": "EmitStatement",
                  "src": "3552:45:18"
                }
              ]
            },
            "documentation": null,
            "id": 5544,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5523,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5522,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "3453:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3453:8:18"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 5525,
                      "name": "msg",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7142,
                      "src": "3470:3:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_message",
                        "typeString": "msg"
                      }
                    },
                    "id": 5526,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "sender",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "3470:10:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  }
                ],
                "id": 5527,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5524,
                  "name": "isOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2625,
                  "src": "3462:7:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3462:19:18"
              }
            ],
            "name": "deletePermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5521,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5516,
                  "name": "_grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5544,
                  "src": "3398:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5515,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3398:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5518,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5544,
                  "src": "3415:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5517,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3415:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5520,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5544,
                  "src": "3428:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5519,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3428:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3397:46:18"
            },
            "returnParameters": {
              "id": 5528,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3481:0:18"
            },
            "scope": 5567,
            "src": "3372:233:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5565,
              "nodeType": "Block",
              "src": "3733:87:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5559,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5546,
                        "src": "3779:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5560,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5548,
                        "src": "3788:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5561,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5550,
                        "src": "3793:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5562,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5552,
                        "src": "3800:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5557,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "3751:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5558,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "verifyPermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2469,
                      "src": "3751:27:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (address,address,bytes32,bytes32) view external returns (bool)"
                      }
                    },
                    "id": 5563,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3751:61:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 5556,
                  "id": 5564,
                  "nodeType": "Return",
                  "src": "3744:68:18"
                }
              ]
            },
            "documentation": null,
            "id": 5566,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "verifyPermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5553,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5546,
                  "name": "_grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3639:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5545,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3639:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5548,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3656:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5547,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3656:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5550,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3669:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5549,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3669:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5552,
                  "name": "_paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3684:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5551,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3684:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3638:66:18"
            },
            "returnParameters": {
              "id": 5556,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5555,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3728:4:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5554,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3728:4:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3727:6:18"
            },
            "scope": 5567,
            "src": "3613:207:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5568,
        "src": "197:3626:18"
      }
    ],
    "src": "0:3823:18"
  },
  "legacyAST": {
    "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/apps/AppManager.sol",
    "exportedSymbols": {
      "AppManager": [
        5567
      ]
    },
    "id": 5568,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5207,
        "literals": [
          "solidity",
          ">=",
          "0.4",
          ".22",
          "<",
          "0.6",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:32:18"
      },
      {
        "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/Permission/Permission.sol",
        "file": "../Permission/Permission.sol",
        "id": 5208,
        "nodeType": "ImportDirective",
        "scope": 5568,
        "sourceUnit": 2935,
        "src": "36:38:18",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/Own/Own.sol",
        "file": "../Own/Own.sol",
        "id": 5209,
        "nodeType": "ImportDirective",
        "scope": 5568,
        "sourceUnit": 2696,
        "src": "76:24:18",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/Interface/IGovernShareManager.sol",
        "file": "../Interface/IGovernShareManager.sol",
        "id": 5210,
        "nodeType": "ImportDirective",
        "scope": 5568,
        "sourceUnit": 2411,
        "src": "102:46:18",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/D/_______work/FD_Contract_ETH/fd/contracts/Interface/ITradeFundPool.sol",
        "file": "../Interface/ITradeFundPool.sol",
        "id": 5211,
        "nodeType": "ImportDirective",
        "scope": 5568,
        "sourceUnit": 2533,
        "src": "150:41:18",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 5212,
              "name": "Own",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2695,
              "src": "220:3:18",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Own_$2695",
                "typeString": "contract Own"
              }
            },
            "id": 5213,
            "nodeType": "InheritanceSpecifier",
            "src": "220:3:18"
          }
        ],
        "contractDependencies": [
          2695,
          2934
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 5567,
        "linearizedBaseContracts": [
          5567,
          2695
        ],
        "name": "AppManager",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "id": 5215,
            "name": "permission",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "232:30:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_contract$_IPermission_$2479",
              "typeString": "contract IPermission"
            },
            "typeName": {
              "contractScope": null,
              "id": 5214,
              "name": "IPermission",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2479,
              "src": "232:11:18",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_IPermission_$2479",
                "typeString": "contract IPermission"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 5217,
            "name": "tradeFundPool",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "271:37:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address_payable",
              "typeString": "address payable"
            },
            "typeName": {
              "id": 5216,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "271:15:18",
              "stateMutability": "payable",
              "typeDescriptions": {
                "typeIdentifier": "t_address_payable",
                "typeString": "address payable"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 5219,
            "name": "governShareManager",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "317:42:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address_payable",
              "typeString": "address payable"
            },
            "typeName": {
              "id": 5218,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "317:15:18",
              "stateMutability": "payable",
              "typeDescriptions": {
                "typeIdentifier": "t_address_payable",
                "typeString": "address payable"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 5221,
            "name": "fdToken",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "368:31:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address_payable",
              "typeString": "address payable"
            },
            "typeName": {
              "id": 5220,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "368:15:18",
              "stateMutability": "payable",
              "typeDescriptions": {
                "typeIdentifier": "t_address_payable",
                "typeString": "address payable"
              }
            },
            "value": null,
            "visibility": "private"
          },
          {
            "constant": false,
            "id": 5223,
            "name": "dateTime",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "408:23:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address",
              "typeString": "address"
            },
            "typeName": {
              "id": 5222,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "408:7:18",
              "stateMutability": "nonpayable",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 5225,
            "name": "bool_isInit",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "440:23:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bool",
              "typeString": "bool"
            },
            "typeName": {
              "id": 5224,
              "name": "bool",
              "nodeType": "ElementaryTypeName",
              "src": "440:4:18",
              "typeDescriptions": {
                "typeIdentifier": "t_bool",
                "typeString": "bool"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": true,
            "id": 5228,
            "name": "EMPTY_PARAM_HASH",
            "nodeType": "VariableDeclaration",
            "scope": 5567,
            "src": "472:109:18",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_bytes32",
              "typeString": "bytes32"
            },
            "typeName": {
              "id": 5226,
              "name": "bytes32",
              "nodeType": "ElementaryTypeName",
              "src": "472:7:18",
              "typeDescriptions": {
                "typeIdentifier": "t_bytes32",
                "typeString": "bytes32"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "307832393064656364393534386236326138643630333435613938383338366663383462613662633935343834303038663633363266393331363065663365353633",
              "id": 5227,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "515:66:18",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_18569430475105882587588266137607568536673111973893317399460219858819262702947_by_1",
                "typeString": "int_const 1856...(69 digits omitted)...2947"
              },
              "value": "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
            },
            "visibility": "public"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5238,
            "name": "OnAddPermission",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5237,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5230,
                  "indexed": true,
                  "name": "grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5238,
                  "src": "612:23:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5229,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "612:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5232,
                  "indexed": true,
                  "name": "app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5238,
                  "src": "637:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5231,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "637:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5234,
                  "indexed": true,
                  "name": "vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5238,
                  "src": "658:21:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5233,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "658:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5236,
                  "indexed": false,
                  "name": "paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5238,
                  "src": "681:18:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5235,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "681:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "611:89:18"
            },
            "src": "590:111:18"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5248,
            "name": "OnChangePermission",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5247,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5240,
                  "indexed": true,
                  "name": "newGrantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5248,
                  "src": "744:26:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5239,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "744:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5242,
                  "indexed": true,
                  "name": "app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5248,
                  "src": "781:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5241,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "781:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5244,
                  "indexed": true,
                  "name": "vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5248,
                  "src": "811:21:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5243,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "811:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5246,
                  "indexed": false,
                  "name": "paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5248,
                  "src": "843:18:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5245,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "843:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "733:135:18"
            },
            "src": "709:160:18"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5256,
            "name": "OnDeletePermission",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5255,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5250,
                  "indexed": true,
                  "name": "grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5256,
                  "src": "902:23:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5249,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "902:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5252,
                  "indexed": true,
                  "name": "app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5256,
                  "src": "927:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5251,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "927:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5254,
                  "indexed": true,
                  "name": "vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5256,
                  "src": "948:21:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5253,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "948:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "901:69:18"
            },
            "src": "877:94:18"
          },
          {
            "body": {
              "id": 5265,
              "nodeType": "Block",
              "src": "1000:48:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5263,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5259,
                      "name": "permission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5215,
                      "src": "1011:10:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IPermission_$2479",
                        "typeString": "contract IPermission"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [],
                      "expression": {
                        "argumentTypes": [],
                        "id": 5261,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "NewExpression",
                        "src": "1024:14:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_creation_nonpayable$__$returns$_t_contract$_Permission_$2934_$",
                          "typeString": "function () returns (contract Permission)"
                        },
                        "typeName": {
                          "contractScope": null,
                          "id": 5260,
                          "name": "Permission",
                          "nodeType": "UserDefinedTypeName",
                          "referencedDeclaration": 2934,
                          "src": "1028:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_contract$_Permission_$2934",
                            "typeString": "contract Permission"
                          }
                        }
                      },
                      "id": 5262,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "1024:16:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_Permission_$2934",
                        "typeString": "contract Permission"
                      }
                    },
                    "src": "1011:29:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IPermission_$2479",
                      "typeString": "contract IPermission"
                    }
                  },
                  "id": 5264,
                  "nodeType": "ExpressionStatement",
                  "src": "1011:29:18"
                }
              ]
            },
            "documentation": null,
            "id": 5266,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5257,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "990:2:18"
            },
            "returnParameters": {
              "id": 5258,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1000:0:18"
            },
            "scope": 5567,
            "src": "979:69:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5276,
              "nodeType": "Block",
              "src": "1074:62:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 5271,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5269,
                          "name": "bool_isInit",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5225,
                          "src": "1093:11:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "74727565",
                          "id": 5270,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "bool",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1108:4:18",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          "value": "true"
                        },
                        "src": "1093:19:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "",
                        "id": 5272,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1113:2:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                          "typeString": "literal_string \"\""
                        },
                        "value": ""
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                          "typeString": "literal_string \"\""
                        }
                      ],
                      "id": 5268,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "1085:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5273,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1085:31:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5274,
                  "nodeType": "ExpressionStatement",
                  "src": "1085:31:18"
                },
                {
                  "id": 5275,
                  "nodeType": "PlaceholderStatement",
                  "src": "1127:1:18"
                }
              ]
            },
            "documentation": null,
            "id": 5277,
            "name": "isInit",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 5267,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1071:2:18"
            },
            "src": "1056:80:18",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 5319,
              "nodeType": "Block",
              "src": "1308:232:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 5295,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5293,
                          "name": "bool_isInit",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5225,
                          "src": "1327:11:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "66616c7365",
                          "id": 5294,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "bool",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1342:5:18",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          },
                          "value": "false"
                        },
                        "src": "1327:20:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "",
                        "id": 5296,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1348:2:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                          "typeString": "literal_string \"\""
                        },
                        "value": ""
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
                          "typeString": "literal_string \"\""
                        }
                      ],
                      "id": 5292,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "1319:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5297,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1319:32:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5298,
                  "nodeType": "ExpressionStatement",
                  "src": "1319:32:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5301,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5299,
                      "name": "tradeFundPool",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5217,
                      "src": "1362:13:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5300,
                      "name": "_tradeFundPool",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5279,
                      "src": "1378:14:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "1362:30:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "id": 5302,
                  "nodeType": "ExpressionStatement",
                  "src": "1362:30:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5305,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5303,
                      "name": "governShareManager",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5219,
                      "src": "1403:18:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5304,
                      "name": "_governShareManager",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5281,
                      "src": "1424:19:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "1403:40:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "id": 5306,
                  "nodeType": "ExpressionStatement",
                  "src": "1403:40:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5309,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5307,
                      "name": "fdToken",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5221,
                      "src": "1454:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5308,
                      "name": "_fdToken",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5283,
                      "src": "1464:8:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "1454:18:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "id": 5310,
                  "nodeType": "ExpressionStatement",
                  "src": "1454:18:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5313,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5311,
                      "name": "dateTime",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5223,
                      "src": "1483:8:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 5312,
                      "name": "_dateTime",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5285,
                      "src": "1494:9:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1483:20:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 5314,
                  "nodeType": "ExpressionStatement",
                  "src": "1483:20:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5317,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5315,
                      "name": "bool_isInit",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5225,
                      "src": "1514:11:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 5316,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1528:4:18",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "1514:18:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 5318,
                  "nodeType": "ExpressionStatement",
                  "src": "1514:18:18"
                }
              ]
            },
            "documentation": null,
            "id": 5320,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 5288,
                      "name": "msg",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7142,
                      "src": "1297:3:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_message",
                        "typeString": "msg"
                      }
                    },
                    "id": 5289,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "sender",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "1297:10:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  }
                ],
                "id": 5290,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5287,
                  "name": "isOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2625,
                  "src": "1289:7:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1289:19:18"
              }
            ],
            "name": "initialize",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5286,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5279,
                  "name": "_tradeFundPool",
                  "nodeType": "VariableDeclaration",
                  "scope": 5320,
                  "src": "1164:30:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5278,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1164:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5281,
                  "name": "_governShareManager",
                  "nodeType": "VariableDeclaration",
                  "scope": 5320,
                  "src": "1195:35:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5280,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1195:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5283,
                  "name": "_fdToken",
                  "nodeType": "VariableDeclaration",
                  "scope": 5320,
                  "src": "1231:24:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5282,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1231:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5285,
                  "name": "_dateTime",
                  "nodeType": "VariableDeclaration",
                  "scope": 5320,
                  "src": "1256:17:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5284,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1256:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1163:111:18"
            },
            "returnParameters": {
              "id": 5291,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1308:0:18"
            },
            "scope": 5567,
            "src": "1144:396:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5336,
              "nodeType": "Block",
              "src": "1620:126:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "id": 5330,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5326,
                          "name": "governShareManager",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5219,
                          "src": "1639:18:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 5328,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1669:1:18",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 5327,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1661:7:18",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 5329,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1661:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1639:32:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "54686520616464726573732063616e6e6f7420626520656d707479",
                        "id": 5331,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1672:29:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        },
                        "value": "The address cannot be empty"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        }
                      ],
                      "id": 5325,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "1631:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5332,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1631:71:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5333,
                  "nodeType": "ExpressionStatement",
                  "src": "1631:71:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5334,
                    "name": "governShareManager",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5219,
                    "src": "1720:18:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "functionReturnParameters": 5324,
                  "id": 5335,
                  "nodeType": "Return",
                  "src": "1713:25:18"
                }
              ]
            },
            "documentation": null,
            "id": 5337,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "getGovernShareManager",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5321,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1578:2:18"
            },
            "returnParameters": {
              "id": 5324,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5323,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5337,
                  "src": "1603:15:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5322,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1603:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1602:17:18"
            },
            "scope": 5567,
            "src": "1548:198:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5353,
              "nodeType": "Block",
              "src": "1820:116:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "id": 5347,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5343,
                          "name": "tradeFundPool",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5217,
                          "src": "1839:13:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 5345,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "1864:1:18",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 5344,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "1856:7:18",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 5346,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "1856:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "1839:27:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "54686520616464726573732063616e6e6f7420626520656d707479",
                        "id": 5348,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "1867:29:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        },
                        "value": "The address cannot be empty"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        }
                      ],
                      "id": 5342,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "1831:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5349,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1831:66:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5350,
                  "nodeType": "ExpressionStatement",
                  "src": "1831:66:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5351,
                    "name": "tradeFundPool",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5217,
                    "src": "1915:13:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "functionReturnParameters": 5341,
                  "id": 5352,
                  "nodeType": "Return",
                  "src": "1908:20:18"
                }
              ]
            },
            "documentation": null,
            "id": 5354,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "getTradeFundPool",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5338,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1779:2:18"
            },
            "returnParameters": {
              "id": 5341,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5340,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5354,
                  "src": "1804:15:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5339,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1804:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1803:17:18"
            },
            "scope": 5567,
            "src": "1754:182:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5370,
              "nodeType": "Block",
              "src": "2004:104:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        "id": 5364,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5360,
                          "name": "fdToken",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5221,
                          "src": "2023:7:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 5362,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2042:1:18",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 5361,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "2034:7:18",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 5363,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2034:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "2023:21:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "54686520616464726573732063616e6e6f7420626520656d707479",
                        "id": 5365,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2045:29:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        },
                        "value": "The address cannot be empty"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        }
                      ],
                      "id": 5359,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "2015:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5366,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2015:60:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5367,
                  "nodeType": "ExpressionStatement",
                  "src": "2015:60:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5368,
                    "name": "fdToken",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5221,
                    "src": "2093:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "functionReturnParameters": 5358,
                  "id": 5369,
                  "nodeType": "Return",
                  "src": "2086:14:18"
                }
              ]
            },
            "documentation": null,
            "id": 5371,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "getFdToken",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5355,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1963:2:18"
            },
            "returnParameters": {
              "id": 5358,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5357,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5371,
                  "src": "1988:15:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 5356,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1988:15:18",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1987:17:18"
            },
            "scope": 5567,
            "src": "1944:164:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5387,
              "nodeType": "Block",
              "src": "2169:106:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 5381,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5377,
                          "name": "dateTime",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5223,
                          "src": "2188:8:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "!=",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "hexValue": "30",
                              "id": 5379,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "kind": "number",
                              "lValueRequested": false,
                              "nodeType": "Literal",
                              "src": "2208:1:18",
                              "subdenomination": null,
                              "typeDescriptions": {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              },
                              "value": "0"
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_rational_0_by_1",
                                "typeString": "int_const 0"
                              }
                            ],
                            "id": 5378,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "lValueRequested": false,
                            "nodeType": "ElementaryTypeNameExpression",
                            "src": "2200:7:18",
                            "typeDescriptions": {
                              "typeIdentifier": "t_type$_t_address_$",
                              "typeString": "type(address)"
                            },
                            "typeName": "address"
                          },
                          "id": 5380,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "typeConversion",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2200:10:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address_payable",
                            "typeString": "address payable"
                          }
                        },
                        "src": "2188:22:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "hexValue": "54686520616464726573732063616e6e6f7420626520656d707479",
                        "id": 5382,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "2211:29:18",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        },
                        "value": "The address cannot be empty"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_466c8c002c9a9a4aaa7a01996767e27a95b38167482f97f1df71672b2ff5144c",
                          "typeString": "literal_string \"The address cannot be empty\""
                        }
                      ],
                      "id": 5376,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7145,
                        7146
                      ],
                      "referencedDeclaration": 7146,
                      "src": "2180:7:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 5383,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2180:61:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5384,
                  "nodeType": "ExpressionStatement",
                  "src": "2180:61:18"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5385,
                    "name": "dateTime",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5223,
                    "src": "2259:8:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 5375,
                  "id": 5386,
                  "nodeType": "Return",
                  "src": "2252:15:18"
                }
              ]
            },
            "documentation": null,
            "id": 5388,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "getDateTime",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5372,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2136:2:18"
            },
            "returnParameters": {
              "id": 5375,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5374,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5388,
                  "src": "2161:7:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5373,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2161:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2160:9:18"
            },
            "scope": 5567,
            "src": "2116:159:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5418,
              "nodeType": "Block",
              "src": "2389:135:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5406,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5390,
                        "src": "2425:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5407,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5392,
                        "src": "2434:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5408,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5394,
                        "src": "2439:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5403,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "2400:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5405,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "addPermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2421,
                      "src": "2400:24:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32) external"
                      }
                    },
                    "id": 5409,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2400:46:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5410,
                  "nodeType": "ExpressionStatement",
                  "src": "2400:46:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5412,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5390,
                        "src": "2478:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5413,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5392,
                        "src": "2487:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5414,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5394,
                        "src": "2492:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5415,
                        "name": "EMPTY_PARAM_HASH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5228,
                        "src": "2499:16:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5411,
                      "name": "OnAddPermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5238,
                      "src": "2462:15:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32)"
                      }
                    },
                    "id": 5416,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2462:54:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5417,
                  "nodeType": "EmitStatement",
                  "src": "2457:59:18"
                }
              ]
            },
            "documentation": null,
            "id": 5419,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5397,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5396,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "2361:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2361:8:18"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 5399,
                      "name": "msg",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7142,
                      "src": "2378:3:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_message",
                        "typeString": "msg"
                      }
                    },
                    "id": 5400,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "sender",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "2378:10:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  }
                ],
                "id": 5401,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5398,
                  "name": "isOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2625,
                  "src": "2370:7:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2370:19:18"
              }
            ],
            "name": "addPermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5395,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5390,
                  "name": "_grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5419,
                  "src": "2306:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5389,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2306:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5392,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5419,
                  "src": "2323:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5391,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2323:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5394,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5419,
                  "src": "2336:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5393,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2336:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2305:46:18"
            },
            "returnParameters": {
              "id": 5402,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2389:0:18"
            },
            "scope": 5567,
            "src": "2283:241:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5447,
              "nodeType": "Block",
              "src": "2624:158:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5433,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7142,
                          "src": "2663:3:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5434,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2663:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5435,
                        "name": "_newGrantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5421,
                        "src": "2674:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5436,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5423,
                        "src": "2686:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5437,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5425,
                        "src": "2691:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5430,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "2635:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5432,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "changePermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2432,
                      "src": "2635:27:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_address_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,address,bytes32) external"
                      }
                    },
                    "id": 5438,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2635:63:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5439,
                  "nodeType": "ExpressionStatement",
                  "src": "2635:63:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5441,
                        "name": "_newGrantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5421,
                        "src": "2733:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5442,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5423,
                        "src": "2745:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5443,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5425,
                        "src": "2750:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5444,
                        "name": "EMPTY_PARAM_HASH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5228,
                        "src": "2757:16:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5440,
                      "name": "OnChangePermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5248,
                      "src": "2714:18:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32)"
                      }
                    },
                    "id": 5445,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2714:60:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5446,
                  "nodeType": "EmitStatement",
                  "src": "2709:65:18"
                }
              ]
            },
            "documentation": null,
            "id": 5448,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5428,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5427,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "2616:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2616:8:18"
              }
            ],
            "name": "changePermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5426,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5421,
                  "name": "_newGrantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5448,
                  "src": "2558:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5420,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2558:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5423,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5448,
                  "src": "2578:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5422,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2578:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5425,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5448,
                  "src": "2591:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5424,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2591:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2557:49:18"
            },
            "returnParameters": {
              "id": 5429,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2624:0:18"
            },
            "scope": 5567,
            "src": "2532:250:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5481,
              "nodeType": "Block",
              "src": "2937:142:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5468,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5450,
                        "src": "2973:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5469,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5452,
                        "src": "2982:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5470,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5454,
                        "src": "2987:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5471,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5456,
                        "src": "2994:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5465,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "2948:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5467,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "addPermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2443,
                      "src": "2948:24:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32) external"
                      }
                    },
                    "id": 5472,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2948:58:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5473,
                  "nodeType": "ExpressionStatement",
                  "src": "2948:58:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5475,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5450,
                        "src": "3038:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5476,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5452,
                        "src": "3047:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5477,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5454,
                        "src": "3052:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5478,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5456,
                        "src": "3059:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5474,
                      "name": "OnAddPermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5238,
                      "src": "3022:15:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32)"
                      }
                    },
                    "id": 5479,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3022:49:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5480,
                  "nodeType": "EmitStatement",
                  "src": "3017:54:18"
                }
              ]
            },
            "documentation": null,
            "id": 5482,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5459,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5458,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "2898:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2898:8:18"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 5461,
                      "name": "msg",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7142,
                      "src": "2920:3:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_message",
                        "typeString": "msg"
                      }
                    },
                    "id": 5462,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "sender",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "2920:10:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  }
                ],
                "id": 5463,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5460,
                  "name": "isOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2625,
                  "src": "2912:7:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2912:19:18"
              }
            ],
            "name": "addPermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5457,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5450,
                  "name": "_grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5482,
                  "src": "2813:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5449,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2813:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5452,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5482,
                  "src": "2830:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5451,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2830:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5454,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5482,
                  "src": "2843:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5453,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2843:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5456,
                  "name": "_paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5482,
                  "src": "2858:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5455,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "2858:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2812:66:18"
            },
            "returnParameters": {
              "id": 5464,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2937:0:18"
            },
            "scope": 5567,
            "src": "2790:289:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5513,
              "nodeType": "Block",
              "src": "3199:165:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5498,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7142,
                          "src": "3238:3:18",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5499,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3238:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5500,
                        "name": "_newGrantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5484,
                        "src": "3249:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5501,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5486,
                        "src": "3261:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5502,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5488,
                        "src": "3266:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5503,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5490,
                        "src": "3273:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5495,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "3210:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5497,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "changePermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2456,
                      "src": "3210:27:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,address,bytes32,bytes32) external"
                      }
                    },
                    "id": 5504,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3210:75:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5505,
                  "nodeType": "ExpressionStatement",
                  "src": "3210:75:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5507,
                        "name": "_newGrantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5484,
                        "src": "3320:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5508,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5486,
                        "src": "3332:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5509,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5488,
                        "src": "3337:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5510,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5490,
                        "src": "3344:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5506,
                      "name": "OnChangePermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5248,
                      "src": "3301:18:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32,bytes32)"
                      }
                    },
                    "id": 5511,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3301:55:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5512,
                  "nodeType": "EmitStatement",
                  "src": "3296:60:18"
                }
              ]
            },
            "documentation": null,
            "id": 5514,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5493,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5492,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "3191:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3191:8:18"
              }
            ],
            "name": "changePermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5491,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5484,
                  "name": "_newGrantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5514,
                  "src": "3113:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5483,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3113:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5486,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5514,
                  "src": "3133:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5485,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3133:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5488,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5514,
                  "src": "3146:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5487,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3146:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5490,
                  "name": "_paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5514,
                  "src": "3161:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5489,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3161:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3112:69:18"
            },
            "returnParameters": {
              "id": 5494,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3199:0:18"
            },
            "scope": 5567,
            "src": "3087:277:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5543,
              "nodeType": "Block",
              "src": "3481:124:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5532,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5516,
                        "src": "3520:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5533,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5518,
                        "src": "3529:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5534,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5520,
                        "src": "3534:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5529,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "3492:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5531,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "deletePermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2478,
                      "src": "3492:27:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32) external"
                      }
                    },
                    "id": 5535,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3492:49:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5536,
                  "nodeType": "ExpressionStatement",
                  "src": "3492:49:18"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5538,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5516,
                        "src": "3576:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5539,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5518,
                        "src": "3585:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5540,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5520,
                        "src": "3590:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "id": 5537,
                      "name": "OnDeletePermission",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5256,
                      "src": "3557:18:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_bytes32_$returns$__$",
                        "typeString": "function (address,address,bytes32)"
                      }
                    },
                    "id": 5541,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3557:40:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5542,
                  "nodeType": "EmitStatement",
                  "src": "3552:45:18"
                }
              ]
            },
            "documentation": null,
            "id": 5544,
            "implemented": true,
            "kind": "function",
            "modifiers": [
              {
                "arguments": [],
                "id": 5523,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5522,
                  "name": "isInit",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5277,
                  "src": "3453:6:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3453:8:18"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "expression": {
                      "argumentTypes": null,
                      "id": 5525,
                      "name": "msg",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 7142,
                      "src": "3470:3:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_magic_message",
                        "typeString": "msg"
                      }
                    },
                    "id": 5526,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "memberName": "sender",
                    "nodeType": "MemberAccess",
                    "referencedDeclaration": null,
                    "src": "3470:10:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  }
                ],
                "id": 5527,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5524,
                  "name": "isOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2625,
                  "src": "3462:7:18",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3462:19:18"
              }
            ],
            "name": "deletePermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5521,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5516,
                  "name": "_grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5544,
                  "src": "3398:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5515,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3398:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5518,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5544,
                  "src": "3415:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5517,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3415:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5520,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5544,
                  "src": "3428:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5519,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3428:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3397:46:18"
            },
            "returnParameters": {
              "id": 5528,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3481:0:18"
            },
            "scope": 5567,
            "src": "3372:233:18",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5565,
              "nodeType": "Block",
              "src": "3733:87:18",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5559,
                        "name": "_grantor",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5546,
                        "src": "3779:8:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5560,
                        "name": "_app",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5548,
                        "src": "3788:4:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5561,
                        "name": "_vData",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5550,
                        "src": "3793:6:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 5562,
                        "name": "_paramsHash",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5552,
                        "src": "3800:11:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        },
                        {
                          "typeIdentifier": "t_bytes32",
                          "typeString": "bytes32"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 5557,
                        "name": "permission",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5215,
                        "src": "3751:10:18",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IPermission_$2479",
                          "typeString": "contract IPermission"
                        }
                      },
                      "id": 5558,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "verifyPermission",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2469,
                      "src": "3751:27:18",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_view$_t_address_$_t_address_$_t_bytes32_$_t_bytes32_$returns$_t_bool_$",
                        "typeString": "function (address,address,bytes32,bytes32) view external returns (bool)"
                      }
                    },
                    "id": 5563,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3751:61:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "functionReturnParameters": 5556,
                  "id": 5564,
                  "nodeType": "Return",
                  "src": "3744:68:18"
                }
              ]
            },
            "documentation": null,
            "id": 5566,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "verifyPermission",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5553,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5546,
                  "name": "_grantor",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3639:16:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5545,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3639:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5548,
                  "name": "_app",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3656:12:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5547,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3656:7:18",
                    "stateMutability": "nonpayable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5550,
                  "name": "_vData",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3669:14:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5549,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3669:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 5552,
                  "name": "_paramsHash",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3684:19:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bytes32",
                    "typeString": "bytes32"
                  },
                  "typeName": {
                    "id": 5551,
                    "name": "bytes32",
                    "nodeType": "ElementaryTypeName",
                    "src": "3684:7:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bytes32",
                      "typeString": "bytes32"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3638:66:18"
            },
            "returnParameters": {
              "id": 5556,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5555,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5566,
                  "src": "3728:4:18",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_bool",
                    "typeString": "bool"
                  },
                  "typeName": {
                    "id": 5554,
                    "name": "bool",
                    "nodeType": "ElementaryTypeName",
                    "src": "3728:4:18",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3727:6:18"
            },
            "scope": 5567,
            "src": "3613:207:18",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5568,
        "src": "197:3626:18"
      }
    ],
    "src": "0:3823:18"
  },
  "compiler": {
    "name": "solc",
    "version": "0.5.8+commit.23d335f2.Emscripten.clang"
  },
  "networks": {
    "3": {
      "events": {},
      "links": {},
      "address": "0xfd17c79d89FD731F8AF92BF2B10c32c587D867cE",
      "transactionHash": "0xdb6fba6105fdddffdaabd9704f3761802a82f6bbcae20ce7f78e26e40cd4d775"
    },
    "5777": {
      "events": {},
      "links": {},
      "address": "0xAaf85e03Acc33735c387dAcCe1Fb319F85b799B3",
      "transactionHash": "0x0b96e60ecf65a134634279185f7b5954a5e05624a4a799fd67e3a7307356c7bc"
    }
  },
  "schemaVersion": "3.0.11",
  "updatedAt": "2019-11-05T02:27:33.788Z",
  "devdoc": {
    "methods": {}
  },
  "userdoc": {
    "methods": {}
  }
}