// import common from "@/store/common";
import { TransactionConfig } from "web3-core";
// import { AbiItem } from "web3-utils";
// import { fundAbi } from "./FundPoolAbi";
import { CONTRACT_CONFIG } from "@/config";
import { AbiItem } from "web3-utils";
// import { voteAbi } from "./VoteAbi";
import MetaMask from "@/store/metamaskwallet";
class Web3Tool
{

    /**
     * 根据地址hash查询余额
     * @param addr 地址
     */
    public async getBalanceByAddr(addr: string)
    {
        try
        {
            return MetaMask.web3.eth.getBalance(addr)
        } catch (error)
        {
            throw error;
        }
    }

    /**
     * 调用合约查询数据
     * @param abi 
     * @param addr 
     * @param methods 
     * @param args 
     */
    public async contractCall(name: 'fundPool' | 'vote', hash: string, methods: string, args?: any[])
    {
        const abi = name === 'fundPool' ? CONTRACT_CONFIG.fund_abi : CONTRACT_CONFIG.vote_abi;
        const contract = new MetaMask.web3.eth.Contract(abi as AbiItem[], hash);
        try
        {
            if (Array.isArray(args))
            {
                const result = await contract.methods[methods](...args).call();
                return result;
            }
            else
            {
                return contract.methods[methods]().call()
            }
        } catch (error)
        {
            throw error;
        }
    }

    /**
     * 调用合约执行操作
     * @param abi 
     * @param addr 
     * @param methods 
     * @param args 
     * @param sendArgs 
     */
    public async contractSend(name: 'fundPool' | 'vote' | 'jump', hash: string, methods: string, args?: any[], sendArgs?: any)
    {
        let abi;
        if (name === 'fundPool')
        {
            abi = CONTRACT_CONFIG.fund_abi;
        }
        else if (name === 'vote')
        {
            abi = CONTRACT_CONFIG.vote_abi;
        }
        else
        {
            abi = CONTRACT_CONFIG.jump_abi;
        }
        const contract = new MetaMask.web3.eth.Contract(abi as AbiItem[], hash);
        return new Promise<string>((r, j) =>
        {

            if (Array.isArray(args))
            {
                contract.methods[methods](...args).send(sendArgs)
                    .on('transactionHash', (txid) =>
                    {
                        console.log(txid);
                        r(txid);
                    })
                    .on('error', err => { console.log(err) }); // If a out of gas error, the second parameter is the receipt.
            }
            else
            {
                contract.methods[methods]().send(sendArgs)
                    .on('transactionHash', (txid) =>
                    {
                        console.log(txid);
                        r(txid);
                    })
                    .on('error', err => j(err)); // If a out of gas error, the second parameter is the receipt.
            }
        })
    }

    public applyProposal = (votehash, name: string, recipient: string, value: any, timeConsuming: number, detail: string) =>
    {
        return new Promise<string>((r, j) =>
        {

            // const contract = new MetaMask.web3.eth.Contract(voteAbi,votehash);
            // contract.methods.applyProposal(name,recipient,MetaMask.web3.utils.toWei(value,"ether"),timeConsuming,detail).send({from:MetaMask.metamaskAddress})
            // .on('transactionHash', (hash)=>{
            //     console.log(hash);
            //     r(hash);
            // })
            // // .on('confirmation', (confirmationNumber, receipt)=>{
            // //     console.log('receipt',receipt);

            // // })
            // // .on('receipt', (receipt)=>{
            // //     // receipt example
            // //     console.log(receipt); // 查询这里可以得到结果
            // // })
            // .on('error', err=>j(err)); // If a out of gas error, the second parameter is the receipt.
        })
    }

    

    public getCurrentAddrBalances = async () =>
    {
        try 
        {
            const result = await this.contractCall('fundPool', CONTRACT_CONFIG.fund_hash, 'balances', ['0xb47076E7bD29bb62c6818Dbf83950F331845B5C6']);
            if (result['_hex'])
            {
                console.log('result:' + MetaMask.web3.utils.hexToNumber(result['_hex']))
                return MetaMask.web3.utils.hexToNumber(result['_hex'])
            }
            else
            {
                return 0;
            }
        }
        catch (error) 
        {
            throw error;
        }
    }

    public getProposalStateByIndex = async () =>
    {
        // return new Promise<any>((r,j)=>{
        //     const contract = new MetaMask.web3.eth.Contract(voteAbi,'0x4CfB3A1F751be2e4D9396C7860C09c7751a95ef4');
        //     contract.methods.getProposalStateByIndex(1).call(undefined, function (error, result) {
        //         console.log('error:' + error)            
        //         if(!error)
        //         {
        //             r(result)
        //             console.log('result',result)
        //         }
        //     })
        // })
    }

    public deployContract = async (abi: any, contractBytecode: string, args?: any[]) =>
    {
        const contract = new MetaMask.web3.eth.Contract(abi);
        const data = args ? { data: contractBytecode, arguments: args } : { data: contractBytecode }
        const deploy = contract.deploy(data)
        deploy.estimateGas()
            .then(value =>
            {
                console.log(value);
                MetaMask.web3.eth.getGasPrice()
                    .then(price =>
                    {
                        console.log(price);

                        deploy.send({ from: '0xb47076E7bD29bb62c6818Dbf83950F331845B5C6', gas: value * 10, gasPrice: price })
                            // .on('error',err=>{
                            //     console.error(err);
                            // })
                            // .on('transactionHash',(transactionHash:string)=>{
                            //     console.log("hash:",transactionHash)
                            // })
                            // .on('receipt',receipt=>{
                            //     console.log(receipt.contractAddress);                    
                            // })
                            // .on('confirmation',(confirmationNumber,receipt)=>{
                            //     console.log("receipt,",receipt)
                            // })
                            .then(newContractInstance =>
                            {
                                console.log('contract address', newContractInstance.options.address) // instance with the new contract address
                            })
                    })
            })
    }

    /**
     * 投票给提案
     * @param proposalIndex 
     * @param result 
     */
    public async vote(proposalIndex: number, result: number)
    {
        // const contract = new MetaMask.web3.eth.Contract(voteAbi,'0x4CfB3A1F751be2e4D9396C7860C09c7751a95ef4');
        // contract.methods.vote(proposalIndex,result).send({from:'0xb47076E7bD29bb62c6818Dbf83950F331845B5C6'})
        // .on('transactionHash', (hash)=>{
        //     console.log(hash);
        // })
        // .on('confirmation', (confirmationNumber, receipt)=>{
        //     console.log('receipt',receipt);            
        // })
        // .on('receipt', (receipt)=>{
        //     // receipt example
        //     console.log(receipt); // 查询这里可以得到结果
        // })
        // .on('error', err=>console.error(err)); // If a out of gas error, the second parameter is the receipt.
    }

    /**
     * 查询项目是否处于众筹阶段
     */
    public async crowdFunding()
    {
        this.contractCall('fundPool', CONTRACT_CONFIG.fund_hash, "crowdFunding")
            .then(result =>
            {
                console.log(result);

            })
            .catch(err =>
            {
                console.error(err);
            })
    }

    /**
     * 获取储备池里还有多少eth
     */
    public async sellReserve()
    {
        this.contractCall('fundPool', CONTRACT_CONFIG.fund_hash, "sellReserve")
            .then(result =>
            {
                console.log(result);

            })
            .catch(err =>
            {
                console.error(err);
            })
    }

    /**
     * 众筹阶段投入的eth数量，一旦正式开始，这个字段就毫无意义了
     * @param addr 某个地址
     */
    public async crowdFundingEth(addr: string)
    {
        this.contractCall('fundPool', CONTRACT_CONFIG.fund_hash, "crowdFundingEth", [addr])
            .then(result =>
            {
                console.log(result);

            })
            .catch(err =>
            {
                console.error(err);
            })
    }

    /**
     * 众筹的目标金额
     */
    public async crowdFundMoney()
    {
        this.contractCall('fundPool', CONTRACT_CONFIG.fund_hash, "crowdFundMoney")
            .then(result =>
            {
                console.log(result);

            })
            .catch(err =>
            {
                console.error(err);
            })
    }

    /**
     * 众筹的时间
     */
    public async crowdFundDays()
    {
        this.contractCall('fundPool', CONTRACT_CONFIG.fund_hash, "crowdFundDays")
            .then(result =>
            {
                console.log(result);

            })
            .catch(err =>
            {
                console.error(err);
            })
    }


    /**
     * 众筹的时间
     */
    public async crowdFundStartTime()
    {
        this.contractCall('fundPool', CONTRACT_CONFIG.fund_hash, "crowdFundStartTime")
            .then(result =>
            {
                console.log(result);
            })
            .catch(err =>
            {
                console.error(err);
            })
    }

    /**
     * 转账
     */
    public transfer = (data: TransactionConfig) =>
    {
        return new Promise<string>((resolve, reject) =>
        {
            MetaMask.web3.eth.sendTransaction(data, (error, txid: string) =>
            {
                if (error)
                {
                    reject(error);
                }
                else
                {
                    resolve(txid);
                }
            })
        })
    }
}
export default new Web3Tool();