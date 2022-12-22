import {createServerData$} from "solid-start/server";
import {getUser} from "./session";

export const useUser = () =>
    createServerData$(async (_, {request}) => {

        const user = await getUser(request);

        return user;
    });
