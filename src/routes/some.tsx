import React, {FC} from 'react';
import {Component} from "solid-js";
import { A } from 'solid-start';

type SomeProps = {

}

const Some:Component<SomeProps> = (props:SomeProps) => {

    const {

    } = props


    return (
        <div>
            <h1>somePage</h1>
            <A
                href={'/'}
            ><h1>home</h1></A>
        </div>
    );
};

export default Some;