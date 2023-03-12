import {Component, createEffect, createSignal, For, Show} from "solid-js";
import {createServerData$} from "solid-start/server";
import {prismaClient} from "~/db";
import classes from './index.module.scss'
import {unwrap} from "solid-js/store";
import {getPosts, IGetPosts} from "~/common/prisma/rawQueries";
import {getUserFromSession} from "~/shared/helpers/session";
import PostSmall from "~/entities/PostSmall/PostSmall";
import {IndexPageLayout} from "~/pages/IndexPage/ui/IndexPageLayout";


const Home: Component = () => {
    return(<IndexPageLayout/>)
}
export default Home
