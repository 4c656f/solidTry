import {A, refetchRouteData, RouteDataArgs, useRouteData} from "solid-start";
import {useUser$} from "../../serverCallers/useUser$";
import {Component, createEffect, For, onMount, Show, Suspense, useContext} from "solid-js";
import {isServer} from "solid-js/web";
import {UserContext} from "~/components/UserContext/UserContext";
import {createServerData$} from "solid-start/server";
import {db} from "~/db";
import Button from "~/components/ui/Button/Button";



export function routeData(prop: RouteDataArgs) {
    const posts = createServerData$(async (_,{request})=>{
        const postsFromPrisma =  await db.post.findMany({
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


        })
        return postsFromPrisma
    }, {
        key: ['posts']
    })

    return posts
}

const Home: Component = () => {


    const data = useRouteData<typeof routeData>()


    createEffect(()=>{
        console.log(data.loading,data(), 'posts------')
    })

   data()
    return (
        <div>
            {/*<Suspense></Suspense>*/}
            <Show when={!data.loading} >
                <For each={data()} fallback={<h1>loading</h1>}>
                    {(item, index) => (
                        <article>
                            <A href={`/post/${item.link}`}><h1>{item.title}</h1></A>
                        </article>
                    )}
                </For>
            </Show>


            <Show when={data.loading} >
                <h1>loading</h1>
            </Show>
            <Button
                onClick={()=>refetchRouteData('posts')}
            >refetech</Button>
        </div>
    );
}
export default Home