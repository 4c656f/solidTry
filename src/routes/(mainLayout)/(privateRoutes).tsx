import React from 'react';
import {Component} from "solid-js";
import {Outlet, RouteDataArgs} from "solid-start";
import {createServerData$} from "solid-start/server";
import {requireUser} from "~/db/session";

type PrivateRoutesProps = {}


export function routeData(prop: RouteDataArgs) {
    return createServerData$(async (_, {request}) => {
        const userFrom = await requireUser(request, '/sign-in', true)
        return {user: userFrom}
    })
}

const PrivateRoutes: Component<PrivateRoutesProps> = (props: PrivateRoutesProps) => {

    const {} = props

    return (
        <>
            <Outlet/>
        </>
    );
};

export default PrivateRoutes;