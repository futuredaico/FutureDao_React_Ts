import { AbiItem } from "web3-utils";

export const voteAbi:AbiItem[] = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "oneTicketRefuseProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "getProposalStateByIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
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
		"constant": false,
		"inputs": [
			{
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "getMoney",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_recipient",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_timeConsuming",
				"type": "uint256"
			},
			{
				"name": "_detail",
				"type": "string"
			}
		],
		"name": "applyProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "getTapByIndex",
		"outputs": [
			{
				"name": "startTime",
				"type": "uint256"
			},
			{
				"name": "endTime",
				"type": "uint256"
			},
			{
				"name": "money",
				"type": "uint256"
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
				"name": "proposalIndex",
				"type": "uint256"
			},
			{
				"name": "result",
				"type": "uint8"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "getProposalInfoByIndex",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "details",
				"type": "string"
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
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "abortProposal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLengthOfProposalQueue",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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
				"name": "proposalIndex",
				"type": "uint256"
			}
		],
		"name": "process",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_fundPool",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "proposalName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "proposer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timeConsuming",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "detail",
				"type": "string"
			}
		],
		"name": "OnApplyProposal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "voteResult",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "shares",
				"type": "uint256"
			}
		],
		"name": "OnVote",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "pass",
				"type": "bool"
			}
		],
		"name": "OnProcess",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "OnAbort",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "OnOneTicketRefuse",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "getMoney",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "totalMoney",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "getTime",
				"type": "uint256"
			}
		],
		"name": "OnGetMoney",
		"type": "event"
	}
]