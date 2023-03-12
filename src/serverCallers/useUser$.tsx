import {createServerData$} from "solid-start/server";
import {getUserFromSession} from "../shared/helpers/session";


export const useUser$ = (key?: string) => createServerData$(async (_, {request}) => {


    console.log('fires useUser ---------', _)

    const user = await getUserFromSession(request);

    return {
        user: user
    };


}, {
    key: [key]
});

