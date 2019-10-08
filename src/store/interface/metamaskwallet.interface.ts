import Web3 from "web3";
export interface IMetaMastWalletStore
{
    metamaskAddress: string,
    isLoadMetaMask: boolean,
    isLoginMetaMaskFlag: number,
    inintWeb3: () => Promise<Web3>,
    initAccount: () => Promise<string>
}
export interface IMetaMastWalletProps
{
    metamask: IMetaMastWalletStore
}