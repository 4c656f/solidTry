import React, {FC} from 'react';
import {Component} from "solid-js";
import {Outlet} from "solid-start";
import ServerHeader from "~/components/ServerHeader/ServerHeader";

type PrivateRoutesProps = {

}

const PrivateRoutes:Component<PrivateRoutesProps> = (props:PrivateRoutesProps) => {

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

export default PrivateRoutes;