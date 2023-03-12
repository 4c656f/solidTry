import type {Context} from "solid-js";
import {useContext} from "solid-js"


export function useCustomContext<ContextType>
(context: Context<ContextType>):
    NonNullable<ReturnType<typeof useContext<ContextType>>> {

    const contextValue = useContext(context) as Required<ContextType>

    if (!contextValue) {
        throw 'missing context'
    }

    return contextValue
}
