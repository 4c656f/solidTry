import React, {FC} from 'react';
import {Component} from "solid-js";
import {Outlet} from "solid-start";

type PrivateRoutesProps = {

}

const PrivateRoutes:Component<PrivateRoutesProps> = (props:PrivateRoutesProps) => {

    const {
        
    } = props

    console.log('renderRoute')
    
    return (
        <div>
            <h1>privateRoute</h1>
            <Outlet/>
        </div>
    );
};

export default PrivateRoutes;