import {A} from "solid-start";
import {Component, createEffect, createSignal, For, Show} from "solid-js";
import {createServerData$} from "solid-start/server";
import {db} from "~/db";
import classes from './index.module.scss'
import {unwrap} from "solid-js/store";
import {safeUserSelect} from "~/common/prisma/selectors";
import {IFeedPost} from "~/types/IFeedPost";
import CustomImage from "~/components/ui/Image/CustomImage";
import {getPosts, IGetPosts} from "~/common/prisma/rawQueries";
import {getUserFromSession} from "~/db/session";


const Home: Component = () => {

    let elemRef: HTMLDivElement;

    let observerRef: IntersectionObserver

    const [page, setPage] = createSignal(0)

    const [posts, setPosts] = createSignal<null | IGetPosts[]>(null)


    const postsFromServer = createServerData$(async ([, page]: [string, number], {request}) => {


        const user = await getUserFromSession(request)

        const query = getPosts({
            userId: Number(user?.userId),
            skip: page,
            take: 10
        })

        console.log(query)
        const postsFromPrisma:IGetPosts[] = await db.$queryRawUnsafe(query)

        // console.log(postsFromPrisma)

        return postsFromPrisma
    }, {
        key: () => ['posts', page()] as [string, number]
    })

    createEffect(() => {
        if (observerRef) observerRef.disconnect();
        if (postsFromServer.loading || !postsFromServer() || postsFromServer()!.length < 1) return;
        const observerRefCallback = (entries: any[]) => {

            if (entries[0].isIntersecting) {
                console.log('intersecting')
                setPage(prev => prev + 10)
            }

        }
        observerRef = new IntersectionObserver(observerRefCallback)
        observerRef.observe(elemRef)
    })


    createEffect(() => {
        if (postsFromServer.state === 'ready') {
            setPosts(prev => {
                // console.log('setPosts', prev, unwrap(postsFromServer())![0], postsFromServer.state)
                if (!postsFromServer()) return prev
                if (!prev) return [...unwrap(postsFromServer())!]

                return [...prev, ...unwrap(postsFromServer())!]
            })
        }
    })

    createEffect(() => {
        console.log(posts(), 'postschanged----')
    })

    postsFromServer()

    return (
        <div
            class={classes.container}
        >
            <For each={posts()} fallback={null}>
                {(item, index) => (
                    <article>
                        <A href={`/post/${item.link}`}>
                            <h1>{item.title}</h1>
                        </A>
                        <h1>{item.likeInitial}</h1>


                    </article>
                )}
            </For>

            <Show when={postsFromServer.loading}>
                <h1>loading</h1>
            </Show>
            <Show when={!postsFromServer.loading && postsFromServer()!.length < 1}>
                <span>that all</span>
            </Show>
            <div
                ref={elemRef!}
            />
        </div>
    );
}
export default Home