import {createContext, JSX, Resource, useContext} from "solid-js";
import {useUser} from "~/db/useUser";




type UserContextData = Resource<{ user: { userId: string, userName: string, userImage: string } | null } | undefined>;

export const UserContext = createContext<UserContextData>();

type UserContextProviderProps = {
    user: Resource<{ user: { userId: string, userName: string, userImage: string } | null } | undefined>,
    children: JSX.Element
}

export function UserContextProvider(props: UserContextProviderProps) {

    return (
        <UserContext.Provider value={props.user}>
            {props.children}
        </UserContext.Provider>
    );
}
