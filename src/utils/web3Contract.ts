// import common from "@/store/common";
import { TransactionConfig } from "web3-core";
// import { AbiItem } from "web3-utils";
// import { fundAbi } from "./FundPoolAbi";
import { AbiItem } from "web3-utils";
import { Contract, SendOptions } from 'web3-eth-contract';
import { PromiEvent } from 'web3-core';
// import { voteAbi } from "./VoteAbi";
import MetaMask from "@/store/metamaskwallet";
import { PromiseEvent } from "./promiseTool";
export class Web3Contract {

    /**
     * 合约部署方法
     * @param abi abi文件
     * @param contractBytecode bytecode
     * @param args 合约构造方法的参数
     */
    public static async deployContract(abi: AbiItem[], contractBytecode: string, from: string, ...args: any[]) {
        const contract = new MetaMask.web3.eth.Contract(abi);
        const data = args ? { data: contractBytecode, arguments: args } : { data: contractBytecode }
        console.log('data', data);

        const deploy = contract.deploy(data)
        try {
            const count = await deploy.estimateGas();
            const gas = count;  // 预估的gas*10倍，以防gas不够合约部署失败
            const gasPrice = await MetaMask.web3.eth.getGasPrice();
            console.log('gas', gas);
            console.log('gasprice', gasPrice);

            // const newContractInstance = await deploy.send({ from, gas, gasPrice });       1000000000
            const newContractInstance = deploy.send({ from, gas, gasPrice });
            return new PromiseEvent(newContractInstance);
            // deploy.send({ from, gas, gasPrice })
            //     .on("transactionHash", receipt => {
            //         console.log(receipt);
            //     })
            //     .on("confirmation", (confNum, receipt) => {
            //         console.log(confNum);
            //         console.log(receipt);
            //     })
            //     .then(value => {
            //         console.log(value.options.address);
            //     })
            // return
        } catch (error) {
            throw error;
        }
    }

    public hash: string;
    public abiItems: AbiItem[];
    public contract: Contract;

    constructor(abis: AbiItem[], hash: string = "", contract?: Contract) {
        this.hash = hash;
        this.abiItems = abis;
        if (contract) {
            this.contract = contract;
        } else {
            this.contract = new MetaMask.web3.eth.Contract(abis, hash);
        }
    }

    /**
     * 根据地址hash查询余额
     * @param addr 地址
     */
    public getEtherBalanceByAddr(addr: string) {
        return MetaMask.web3.eth.getBalance(addr)
    }

    /**
     * 调用合约查询
     * @param methods 合约方法
     * @param args 方法参数
     */
    public async contractCall(methods: string, args?: any[]) {
        try {
            const method = this.contract.methods[ methods ];
            return Array.isArray(args) ? method(...args).call() : method().call();
            // if (Array.isArray(args)) {
            //     return this.contract.methods[ methods ](...args).call();
            // }
            // else {
            //     return this.contract.methods[ methods ]().call();
            // }
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param methods 
     * @param args 
     * @param sendArgs 
     */
    public contractSend(methods: string, args?: any[], sendArgs?: SendOptions) {
        console.log(methods)
        console.log(args);
        console.log(sendArgs);
        try {
            const method = this.contract.methods[ methods ];    // 先 取得method 用于下一步执行
            const methodResult = Array.isArray(args) ? method(...args) : method();  // 根据参数判断如何执行方法，是否传参
            const result = sendArgs ? methodResult.send(sendArgs) : methodResult(); // 根据转账参数判断是否传参
            return new PromiseEvent(result as PromiEvent<Contract>);
        } catch (error) {
            throw error;
        }
        // if (Array.isArray(args)) {
        //     const result = this.contract.methods[ methods ](...args).send(sendArgs)
        //     return new PromiseEvent(result as PromiEvent<Contract>);
        // }
        // else {
        //     const result = this.contract.methods[ methods ]().send(sendArgs)
        //     return new PromiseEvent(result as PromiEvent<Contract>);
        // }
    }

    /**
     * 转账
     */
    public async transfer(data: TransactionConfig) {
        try {
            const result = await MetaMask.web3.eth.sendTransaction(data);
            return result.transactionHash;
        } catch (error) {
            throw error;
        }
    }
}