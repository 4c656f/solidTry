import {createServerData$} from "solid-start/server";
import {getUserFromDb, getUserFromSession, storage} from "./session";

export const useUser = (key?: string) => createServerData$(async (_, {request}) => {


    const user = await getUserFromSession(request);
    return {
        user: user
    };


}, {
    key: [key]
});

