import { PromiEvent, TransactionReceipt } from 'web3-core';
export class PromiseEvent<T>{
    public promise: PromiEvent<T>
    constructor(param: PromiEvent<T>) {
        this.promise = param;
    }

    // 返回确认
    public onConfrim() {
        return new Promise<TransactionReceipt>((r, j) => {
            this.promise.on("confirmation", (confNumber, receipt) => {
                r(receipt);
            })
            this.promise.on("error", err => {
                j(err)
            })
        })
    }

    // 返回交易Hash
    public onTransactionHash() {
        return new Promise<string>((r, j) => {
            this.promise.on("transactionHash", (receipt) => {
                r(receipt);
            })
            this.promise.on("error", err => {
                j(err)
            })
        })
    }

    public onThen(): Promise<T> {
        return this.promise;
    }

    public onCatch() {
        return this.promise.catch;
    }

    public onFinally() {
        return this.promise.finally;
    }

}