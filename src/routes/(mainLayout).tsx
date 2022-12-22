import React, {FC} from 'react';
import {Component} from "solid-js";
import {Outlet, RouteDataArgs} from "solid-start";
import server$ from 'solid-start/server';
import ServerHeader from "~/components/ServerHeader/ServerHeader";
import {useUser} from "~/db/useUser";
import {createServerData$} from "solid-start/server/index";

type MainLayoutProps = {

}



const MainLayout:Component<MainLayoutProps> = (props:MainLayoutProps) => {

    const {

    } = props




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