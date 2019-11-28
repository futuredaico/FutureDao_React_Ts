export interface IMetaMastWalletStore
{
    metamaskAddress: string,
    isLoadMetaMask: boolean,
    isLoginMetaMaskFlag: number,
    metamaskNetwork: string,
    inintWeb3: () => Promise<boolean>,
    initAccount: () => Promise<string>,
    getMetamaskBalance: () => Promise<string>,
    checkIsCurrendBindAddress: () => Promise<boolean>,
    getMetamaskNetwork:()=>void
}
export interface IMetaMastWalletProps
{
    metamask: IMetaMastWalletStore
}
export enum MetaMaskNetworkCode {
    // 1为主网，3为Ropsten测试链,4为Rinkeby测试链，42为Kovan测试链，5为Goerli测试链
    Mainnet = '1',
    Ropsten='3',
    Rinkeby='4',
    Kovan='42',
    Goerli='5'
}