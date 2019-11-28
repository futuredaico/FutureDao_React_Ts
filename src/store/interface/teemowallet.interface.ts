export interface ITeemoWalletStore
{
    teemoAddress: string,
    isLoadTeemo: boolean,
    isLoginFlag: number,
    loginTeemo: () => Promise<boolean>,
}
export interface ITeemoWalletProps
{
    teemo: ITeemoWalletStore
}