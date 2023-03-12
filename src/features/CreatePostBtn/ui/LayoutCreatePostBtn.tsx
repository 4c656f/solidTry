import type {Component} from "solid-js";
import Button from "~/shared/ui/atoms/Button/Button";
import {useCustomContext} from "~/shared/helpers";
import {ContextCreatePost} from "~/entities/CreatePost/models";
import {SchemaPost} from "~/features/CreatePostBtn/helpers/SchemaPost";
import {createServerAction$, redirect} from "solid-start/server/index";
import {requireUser} from "~/shared/helpers/session";
import slugify from "slugify";
import {prismaClient} from "~/db";
import {useCreatePostAction$} from "~/features/CreatePostBtn/api/useCreatePostAction$";

type LayoutCreatePostBtn = {}

export const LayoutCreatePostBtn: Component<LayoutCreatePostBtn> = (props) => {

    const {} = props


    const [postEnrolling, postEnroll] = useCreatePostAction$()


    const {getPostStore} = useCustomContext(ContextCreatePost)




    const handleClick = () => {
        const postParseResult = SchemaPost.safeParse(getPostStore)

        if(postParseResult.success){
            postEnroll(postParseResult.data)
        }

    }

    return (
        <Button
            disabled={postEnrolling.pending}
            onClick={handleClick}
        >
            CreatePost
        </Button>
    );
};
