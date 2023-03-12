import classes from "./LayoutCreatePostPage.module.scss";

import type {Component} from "solid-js";
import {LayoutCreatePostWidget} from "~/widgets/CreatePostWidget";

type LayoutCreatePostPage = {}

export const LayoutCreatePostPage: Component<LayoutCreatePostPage> = (props) => {

    const {} = props


    return (
        <div
            class={classes.PostPageContainer}
        >
            <LayoutCreatePostWidget/>
        </div>
    );
};
