import classes from "./LayoutCreatePost.module.scss";

import type {Component, JSX} from "solid-js";
import {createStore} from "solid-js/store";
import {ICreatePostStore} from "~/entities/CreatePost/helpers";
import { ContextCreatePost } from "../models";

type LayoutCreatePost = {
    FeatureMarkdownEditor: JSX.Element;
    FeatureCreatePostBtn: JSX.Element;
    FeatureSetPostTitle: JSX.Element;
}

export const LayoutCreatePost: Component<LayoutCreatePost> = (props) => {

    const {

    } = props

    const [getPostStore, setPostStore] = createStore<ICreatePostStore>({
        PostTitle: "",
        PostContent: ""
    });

    return (
        <div
            class={classes.CratePostEntityContainer}
        >
            <ContextCreatePost.Provider value={{getPostStore, setPostStore}}>
                {props.FeatureSetPostTitle}
                {props.FeatureMarkdownEditor}
                {props.FeatureCreatePostBtn}
            </ContextCreatePost.Provider>
        </div>
    );
};
