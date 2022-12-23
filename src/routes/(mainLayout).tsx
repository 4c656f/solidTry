import React from 'react';
import {Component} from "solid-js";
import {Outlet} from "solid-start";
import ServerHeader from "~/components/ServerHeader/ServerHeader";

type MainLayoutProps = {}


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