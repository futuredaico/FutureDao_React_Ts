export interface IMetaMastWalletStore
{
    metamaskAddress: string,
    isLoadMetaMask: boolean,
    isLoginMetaMaskFlag: number,
    inintWeb3: () => Promise<boolean>,
    initAccount: () => Promise<string>,
    getMetamaskBalance:()=> Promise<string>,
    checkIsCurrendBindAddress:()=> Promise<boolean>,
}
export interface IMetaMastWalletProps
{
    metamask: IMetaMastWalletStore
}