import React from 'react';
import {Component} from "solid-js";
import {Outlet, RouteDataArgs} from "solid-start";
import {useUser} from "~/db/useUser";
import {createServerData$} from "solid-start/server";
import {requireUser} from "~/db/session";

type PrivateRoutesProps = {}


export function routeData(prop: RouteDataArgs) {

    const userId = createServerData$(async (_,{request})=>{
        return await requireUser(request, '/sign-in', true)
    })
    return userId
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