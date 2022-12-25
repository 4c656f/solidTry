import React from 'react';
import type {JSX, Resource} from "solid-js";
import {Component, createContext, createEffect, For, Show} from "solid-js";
import {Outlet, refetchRouteData, RouteDataArgs, useRouteData} from "solid-start";
import ServerHeader from "~/components/ServerHeader/ServerHeader";
import {useUser} from "~/db/useUser";
import {UserContextProvider} from "~/components/UserContext/UserContext";
import {isServer} from "solid-js/web";
import {createServerData$} from "solid-start/server/index";
import {getUserFromSession, requireUser} from "~/db/session";


type MainLayoutProps = {}



export function routeData(prop: RouteDataArgs) {
    return useUser('mainLayout')
}

const MainLayout: Component<MainLayoutProps> = (props: MainLayoutProps) => {

    const {} = props

    const user = useRouteData<typeof routeData>();



    createEffect(()=>{
        console.log('main---', user.loading)
    })
    user()

    return (
        <main>
            {/*<UserContextProvider user={user}>*/}

                <ServerHeader/>
                <section
                    class={'main_section'}
                >
                    <Outlet/>
                </section>
                <button
                    onClick={() => {
                        refetchRouteData('mainLayout')
                    }}
                >refetchLayout</button>

            {/*</UserContextProvider>*/}


        </main>
    );
};

export default MainLayout;