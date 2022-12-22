import {A, refetchRouteData, RouteDataArgs, useRouteData} from "solid-start";
import {createServerData$} from "solid-start/server";

import {useUser} from "../../db/useUser";
import {Component, createEffect, createSignal, For, Show} from "solid-js";
import {db} from "~/db";
import {createStore} from "solid-js/store";
import {isServer} from "solid-js/web";

export function routeData(prop: RouteDataArgs) {

    console.log('index route fires')
    return useUser()
}


const Home: Component = () => {




    const user = useRouteData<typeof routeData>();


    createEffect(()=>{
        console.log(user.loading)
    })

    return (
        <>
            <A
                href={'/some'}
            ><h1>home</h1></A>
            <Show
                when={!user.loading || isServer}
                fallback={<h1>loading...</h1>}
                keyed
            >
                <h1 class="font-bold text-3xl">Hello {user()?.username}</h1>
            </Show>

            <h3 class="font-bold text-xl">Message board</h3>
            <button
                onClick={() => {
                    refetchRouteData(['user'])
                }}
            >
                Refresh

            </button>

            <Show
                when={user.state === 'ready' || isServer}
                fallback={<h1>loading...</h1>}
            >
                <For
                    each={['1','2',3]}
                >
                    {(element)=>{
                        return(
                            <div>
                                <h1>{element}</h1>
                            </div>
                        )
                    }}
                </For>
            </Show>



        </>
    );
}
export default Home