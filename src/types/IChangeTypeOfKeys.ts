export type IChangeTypeOfKeys<T extends object,
    NewType> = {
    [key in keyof T]: NewType
}
