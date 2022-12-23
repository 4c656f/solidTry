import {createServerData$} from "solid-start/server";
import {getUser, getUserId, storage} from "./session";

export const useUser = (key?: string) => createServerData$(async (_, {request}) => {


    const user = await getUserId(request);
    return {
        user: user
    };

}, {
    key: [key],
    reconcileOptions:{
        merge:false
    }
});

export const useUserRep = (key?: string) => createServerData$(async (_, {request}) => {
    return {user: false};
}, {
    key: [key],
    reconcileOptions:{
        merge:false
    }
});
