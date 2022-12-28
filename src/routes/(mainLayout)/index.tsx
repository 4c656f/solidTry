import {A, refetchRouteData} from "solid-start";
import {Component, createEffect, createMemo, createSignal, For, Show, Suspense} from "solid-js";
import {createServerData$} from "solid-start/server";
import {db} from "~/db";
import Button from "~/components/ui/Button/Button";
import { User } from "@prisma/client";
import {isServer} from "solid-js/web";
import classes from './index.module.scss'

type IFeedPost = {author: User, title: string, link: string, id: number, _count: {comments: number, likes: number}}


const Home: Component = () => {

    let elemRef: HTMLDivElement;

    let observerRef: IntersectionObserver

    const [page, setPage] = createSignal(10)

    const [posts, setPosts] = createSignal<null| IFeedPost[]>(null)



    const data = createServerData$(async ([, page]:[string, number], {request}) => {

        console.log(page)

        const postsFromPrisma = await db.post.findMany({
            select: {
                author: true,
                title: true,
                link: true,
                id: true,
                _count: {
                    select: {
                        comments: true,
                        likes: true
                    }
                },
            },
            take: page,
            skip: page-10
        })
        return postsFromPrisma
    }, {
        key: ()=> ['posts', page()] as [string, number]
    })

    if(data.state === 'ready')setPosts([...data()!])

    createEffect(()=>{
        if (observerRef) observerRef.disconnect();
        if (data.loading || !data() || data()!.length < 1) return;
        const observerRefCallback = (entries: any[]) => {

            if (entries[0].isIntersecting) {
                console.log('intersecting')
                setPage(prev => prev+10)
            }

        }
        observerRef = new IntersectionObserver(observerRefCallback)
        observerRef.observe(elemRef)
    })
    createEffect(()=>{
        console.log(page(), '----increase')
    })



    createEffect(() => {
        if(data.state === 'ready') {
            setPosts(prev => {
                console.log('setPosts', prev, data(), data.state)
                if(!data())return prev
                if (!prev) return [...data()!]

                return [...prev, ...data()!]
            })
        }
    })
    createEffect(()=>{
        console.log(posts())
    })

    data()
    return (
        <div
            class={classes.container}
        >
            <For each={posts()} fallback={null}>
                {(item, index) => (
                    <article>
                        <A href={`/post/${item.link}`}><h1>{item.title}</h1></A>
                    </article>
                )}
            </For>

            <Show when={data.loading}>
                <h1>loading</h1>
            </Show>
            <Button
                onClick={() => refetchRouteData('posts')}
            >refetech</Button>
            <div
                ref={elemRef!}
                style={{
                    height: '10px',
                    width: '10px',
                    "background-color": "red"
                }}
            />
        </div>
    );
}
export default Home