import {A} from "solid-start";
import {Component, createEffect, createSignal, For, Show} from "solid-js";
import {createServerData$} from "solid-start/server";
import {db} from "~/db";
import classes from './index.module.scss'
import {unwrap} from "solid-js/store";
import {safeUserSelect} from "~/common/prisma/selectors";
import {IFeedPost} from "~/types/IFeedPost";
import CustomImage from "~/components/ui/Image/CustomImage";


const Home: Component = () => {

    let elemRef: HTMLDivElement;

    let observerRef: IntersectionObserver

    const [page, setPage] = createSignal(10)

    const [posts, setPosts] = createSignal<null | IFeedPost[]>(null)


    const data = createServerData$(async ([, page]: [string, number], {request}) => {


        const postsFromPrisma = await db.post.findMany({
            select: {
                author: {
                    select: safeUserSelect
                },
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
            orderBy: {id: 'asc'},
            take: 10,
            skip: page - 10
        })


        return postsFromPrisma
    }, {
        key: () => ['posts', page()] as [string, number]
    })

    createEffect(() => {
        if (observerRef) observerRef.disconnect();
        if (data.loading || !data() || data()!.length < 1) return;
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
        if (data.state === 'ready') {
            setPosts(prev => {
                // console.log('setPosts', prev, unwrap(data())![0], data.state)
                if (!data()) return prev
                if (!prev) return [...unwrap(data())!]

                return [...prev, ...unwrap(data())!]
            })
        }
    })

    createEffect(() => {
        console.log(posts(), 'postschanged----')
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

                        <CustomImage
                            /*@ts-ignore*/
                            src={item.author.image}
                            className={classes.image}
                            width={50}
                            height={50}
                            alt={`${item.author.userName} picture`
                            }/>
                    </article>
                )}
            </For>

            <Show when={data.loading}>
                <h1>loading</h1>
            </Show>
            <Show when={!data.loading && data()!.length < 1}>
                <span>that all</span>
            </Show>
            <div
                ref={elemRef!}
            />
        </div>
    );
}
export default Home