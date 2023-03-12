import type {Component} from "solid-js";
import {useCustomContext} from "~/shared/helpers";
import {ContextCreatePost} from "~/entities/CreatePost/models";
import Input from "~/shared/ui/atoms/Input/Input";

type LayoutSetPostTitle = {}

export const LayoutSetPostTitle: Component<LayoutSetPostTitle> = (props) => {

    const {} = props

    const {getPostStore, setPostStore} = useCustomContext(ContextCreatePost)

    return (
        <Input
            placeholder={"Post title"}
            onChange={(e) => {
                setPostStore("PostTitle", e.currentTarget.value)
            }
            }
            value={getPostStore.PostTitle}
        />
    );
};
