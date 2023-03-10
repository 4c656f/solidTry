import React from 'react';
import {Component} from "solid-js";
import {Outlet, RouteDataArgs, useRouteData} from "solid-start";
import ServerHeader from "~/widgets/ServerHeader/ServerHeader";
import {useUser$} from "~/serverCallers/useUser$";
import {UserContextProvider} from "~/components/UserContext/UserContext";


type MainLayoutProps = {}


export function routeData(prop: RouteDataArgs) {
    return useUser$('mainLayout')
}

const MainLayout: Component<MainLayoutProps> = (props: MainLayoutProps) => {

    const {} = props

    const user = useRouteData<typeof routeData>();


    return (
        <main>
            <UserContextProvider user={user()} resource={user}>

                <ServerHeader/>
                <section
                    class={'main_section'}
                >
                    <Outlet/>
                </section>
                {/*<button*/}
                {/*    onClick={() => {*/}
                {/*        refetchRouteData('mainLayout')*/}
                {/*    }}*/}
                {/*>refetchLayout*/}
                {/*</button>*/}

            </UserContextProvider>


        </main>
    );
};

export default MainLayout;
