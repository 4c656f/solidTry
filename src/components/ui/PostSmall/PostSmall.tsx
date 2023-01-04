import {Component} from "solid-js";
import {IGetPosts} from "~/common/prisma/rawQueries";
import {A} from "solid-start/router";
import classes from "./PostSmall.module.scss"
import LikeCounter from "~/components/ui/LikeCounter/LikeCounter";

type PostSmallProps = {} & IGetPosts

const PostSmall: Component<PostSmallProps> = (props: PostSmallProps) => {

    const {
        title,
        likesCount,
        likeInitial,
        link,
        id
    } = props


    return (
        <article
            class={classes.container}
        >
            <A
                class={classes.link}
                href={`/post/${link}`}
                replace={true}
            >
                <h1>{title}</h1>
            </A>
            <menu>
                <LikeCounter postId={id} likeInitial={likeInitial} likesCount={likesCount}/>
            </menu>

        </article>
    );
};

export default PostSmall;