import type {Component} from "solid-js";
import {LayoutCreatePost} from "~/entities/CreatePost";
import {LayoutMarkdownEditor} from "~/features/MarkdownEditor";
import {LayoutCreatePostBtn} from "~/features/CreatePostBtn";
import {LayoutSetPostTitle} from "~/features/SetPostTitle";

type LayoutCreatePostWidget = {}

export const LayoutCreatePostWidget: Component<LayoutCreatePostWidget> = (props) => {

    const {} = props


    return (

        <LayoutCreatePost
            FeatureSetPostTitle={<LayoutSetPostTitle/>}
            FeatureCreatePostBtn={<LayoutCreatePostBtn/>}
            FeatureMarkdownEditor={<LayoutMarkdownEditor/>}
        />
    );
};
