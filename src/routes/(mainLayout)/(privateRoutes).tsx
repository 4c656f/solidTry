import React from 'react';
import {Component} from "solid-js";
import {Outlet} from "solid-start";

type PrivateRoutesProps = {}

const PrivateRoutes: Component<PrivateRoutesProps> = (props: PrivateRoutesProps) => {

    const {} = props


    return (
        <>
            <Outlet/>
        </>
    );
};

export default PrivateRoutes;