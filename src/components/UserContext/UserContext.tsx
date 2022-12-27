import {createContext, JSX, Resource, useContext} from "solid-js";
import {useUser$} from "~/serverCallers/useUser$";




type UserContextData = {
    data: {
        user: {
            userId: string;
            userName: string;
            userImage: string;
        } | null;
    } | undefined;
    resource: Resource<{ user: { userId: string; userName: string; userImage: string; } | null; } | undefined>|undefined
}

export const UserContext = createContext<UserContextData>({data: {user: null}, resource: undefined});

type UserContextProviderProps = {
    user: { user: { userId: string; userName: string; userImage: string; } | null; } | undefined;
    resource: Resource<{ user: { userId: string; userName: string; userImage: string; } | null; } | undefined>;
    children: JSX.Element;
}

export function UserContextProvider(props: UserContextProviderProps) {

    return (
        <UserContext.Provider value={{data: props.user, resource: props.resource}}>
            {props.children}
        </UserContext.Provider>
    );
}
