import React from 'react';
import {Component, createEffect} from "solid-js";
import {Outlet, RouteDataArgs, useRouteData} from "solid-start";
import {useUser$} from "~/serverCallers/useUser$";
import {createServerData$} from "solid-start/server";
import {requireUser} from "~/db/session";

type PrivateRoutesProps = {}


export function routeData(prop: RouteDataArgs) {
    return createServerData$(async (_,{request})=>{
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