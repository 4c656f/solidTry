import React from 'react';
import {Component} from "solid-js";
import {Outlet, RouteDataArgs} from "solid-start";
import ServerHeader from "~/components/ServerHeader/ServerHeader";
import {useUser, useUserRep} from "~/db/useUser";

type MainLayoutProps = {}

// export function routeData(prop: RouteDataArgs) {
//
//     console.log('index route fires')
//     return ()=> useUserRep('random123')
// }

const MainLayout: Component<MainLayoutProps> = (props: MainLayoutProps) => {

    const {} = props


    return (
        <main>
            <ServerHeader/>
            <section
                class={'main_section'}
            >
                <Outlet/>
            </section>

        </main>
    );
};

export default MainLayout;