import WalletConnect from "@trustwallet/walletconnect";

export interface ITrustWalletStore
{
    walletConnector: WalletConnect,
    networkId:number
    chainId: number
    trustAddress: string
    // isLoadTeemo: boolean,
    // isLoginFlag: number,
    loginTrust: () => void,
}
export interface ITrustWalletProps
{
    teemo: ITrustWalletStore
}
export interface IChainData{
    name:string,
    short_name:string,
    chain:string,
    network:string,
    chain_id:number,
    network_id:number,
    rpc_url:string
}