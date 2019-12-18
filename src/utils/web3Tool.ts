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
export class Web3Tool {
    public hash: string;
    public abiItems: AbiItem[];
    public contract: Contract;

    constructor(abis: AbiItem[], hash: string = "") {
        this.hash = hash;
        this.abiItems = abis;
        this.contract = new MetaMask.web3.eth.Contract(abis, hash);
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
            if (Array.isArray(args)) {
                const result = await this.contract.methods[ methods ](...args).call();
                return result;
            }
            else {
                return this.contract.methods[ methods ]().call();
            }
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
        if (Array.isArray(args)) {
            const result = this.contract.methods[ methods ](...args).send(sendArgs)
            return new PromiseEvent(result as PromiEvent<Contract>);
        }
        else {
            const result = this.contract.methods[ methods ]().send(sendArgs)
            return new PromiseEvent(result as PromiEvent<Contract>);
        }
    }

    /**
     * 合约部署方法
     * @param abi abi文件
     * @param contractBytecode bytecode
     * @param args 合约构造方法的参数
     */
    public async deployContract(abi: AbiItem[], contractBytecode: string, from: string, args?: any[]) {
        const contract = new MetaMask.web3.eth.Contract(abi);
        const data = args ? { data: contractBytecode, arguments: args } : { data: contractBytecode }
        const deploy = contract.deploy(data)
        try {
            const count = await deploy.estimateGas();
            const gas = count * 10  // 预估的gas*10倍，以防gas不够合约部署失败
            const gasPrice = await MetaMask.web3.eth.getGasPrice();
            const newContractInstance = await deploy.send({ from, gas, gasPrice });
            console.log(newContractInstance.options.address);
            return newContractInstance.options.address;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 转账
     */
    public async transfer(data: TransactionConfig) {
        try {
            const result = await MetaMask.web3.eth.sendTransaction(data);
            console.log(result);
            return result.transactionHash;
        } catch (error) {
            throw error;
        }
    }
}