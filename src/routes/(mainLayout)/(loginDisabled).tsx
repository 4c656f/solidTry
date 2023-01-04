import {Component} from "solid-js";
import {Outlet, RouteDataArgs} from "solid-start";
import {createServerData$} from "solid-start/server/index";
import {requireUser} from "~/db/session";

type LoginDisabledProps = {}

export function routeData(prop: RouteDataArgs) {

    const userId = createServerData$(async (_, {request}) => {
        return await requireUser(request, '/account', false)
    })
    return userId
}

const LoginDisabled: Component<LoginDisabledProps> = (props: LoginDisabledProps) => {

    const {} = props


    return (
        <>
            <Outlet/>
        </>
    );
};

export default LoginDisabled;